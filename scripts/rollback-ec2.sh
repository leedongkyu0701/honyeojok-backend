#!/usr/bin/env bash
# EC2 app-only recovery. No migrations: the DB must support the selected image.
# Single-container replacement can interrupt service. Forced termination or host
# failure can prevent recovery; inspect the durable rollback journal in that case.
set -Eeuo pipefail
umask 077
log() { printf '%s\n' "$*" >&2; }
die() { log "ERROR: $*"; exit 1; }

[[ $# -eq 4 ]] || die 'Usage: rollback-ec2.sh ABS_APP_DIR ECR_IMAGE@sha256:DIGEST AWS_REGION COMPOSE_SHA256'
APP_DIR=$1
TARGET_IMAGE=$2
AWS_REGION=$3
EXPECTED_COMPOSE_SHA=$4
[[ "$APP_DIR" = /* && "$APP_DIR" != / && ! "$APP_DIR" =~ [[:cntrl:]] ]] || die 'Invalid absolute app directory.'
[[ "$AWS_REGION" = ap-northeast-2 ]] || die 'Rollback region must be ap-northeast-2.'
[[ "$TARGET_IMAGE" =~ ^939898395322\.dkr\.ecr\.ap-northeast-2\.amazonaws\.com/honyeojok-backend-lab@sha256:[a-f0-9]{64}$ ]] || die 'Rollback requires the full lab repository sha256 digest; tags and other repositories are forbidden.'
[[ "$EXPECTED_COMPOSE_SHA" =~ ^[a-f0-9]{64}$ ]] || die 'Invalid Compose SHA-256 checksum.'
[[ "$(id -un)" = ubuntu ]] || die 'Run as ubuntu, not root.'
for tool in docker aws flock sha256sum curl mktemp; do
  command -v "$tool" >/dev/null || die "Required EC2 command is missing: $tool"
done
cd -- "$APP_DIR"
[[ -f compose.ec2.yaml && -r compose.ec2.yaml ]] || die 'Missing/read-protected compose.ec2.yaml.'
[[ -f .env.local && -r .env.local ]] || die 'Missing/read-protected .env.local.'
mkdir -p .deploy
exec 9>.deploy/deploy.lock
flock -n 9 || die 'Another deployment or rollback holds .deploy/deploy.lock.'
ACTUAL_COMPOSE_SHA=$(sha256sum compose.ec2.yaml)
[[ "${ACTUAL_COMPOSE_SHA%% *}" = "$EXPECTED_COMPOSE_SHA" ]] || die 'Compose checksum differs from the workflow commit; no app was changed.'

# Keep metadata after failure/interruption, but remove Docker login credentials.
# previous-image belongs to deploy-ec2.sh and is deliberately never overwritten.
RUN_DIR=$(mktemp -d "$PWD/.deploy/rollback.XXXXXXXXXX")
export DOCKER_CONFIG="$RUN_DIR/docker"
trap 'rm -rf -- "$DOCKER_CONFIG"' EXIT
mkdir "$DOCKER_CONFIG"
export APP_IMAGE="$TARGET_IMAGE"
COMPOSE=(docker compose --env-file .env.local -p honyeojok-backend -f compose.ec2.yaml)
READY_URL=http://127.0.0.1:5001/health/ready
REPLACING=0
RECOVERY_SAFE=0
OLD_CONTAINER=''
OLD_IMAGE_ID=''
OLD_STATE=absent
RECOVERY_IMAGE=''
PHASE='recording existing app'

# These functions explicitly propagate every error, including when called from
# if/|| contexts, which disable Bash errexit and ERR traps inside functions.
app_container() {
  local container
  container=$("${COMPOSE[@]}" ps --all -q app) || return 1
  [[ -n "$container" && "$container" != *$'\n'* ]] || { log 'Expected one app container.'; return 1; }
  printf '%s\n' "$container"
}
container_state() {
  docker inspect --format '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$1" || return 1
}
readiness() {
  local status
  status=$(curl --fail --silent --show-error --connect-timeout 3 --max-time 10 \
    --retry 5 --retry-delay 2 --retry-connrefused --retry-all-errors \
    --output /dev/null --write-out '%{http_code}' "$READY_URL") || return 1
  [[ "$status" = 200 ]] || { log "Internal readiness returned HTTP $status (expected 200)."; return 1; }
}
verify_app() {
  local expected=$1 container state actual
  container=$(app_container) || return 1
  state=$(container_state "$container") || return 1
  [[ "$state" = running/healthy ]] || { log "App $container is $state."; return 1; }
  actual=$(docker inspect --format '{{.Image}}' "$container") || return 1
  [[ "$actual" = "$expected" ]] || { log "Image mismatch: expected=$expected actual=$actual"; return 1; }
  readiness || return 1
}
record_current() {
  printf '%s\n' "$1" > "$RUN_DIR/current-image.tmp" || return 1
  mv -f -- "$RUN_DIR/current-image.tmp" .deploy/current-image || return 1
}
recover_once() {
  export APP_IMAGE="$RECOVERY_IMAGE"
  "${COMPOSE[@]}" up -d --no-deps --no-build --pull never --wait --wait-timeout 120 app </dev/null || return 1
  verify_app "$OLD_IMAGE_ID" || return 1
  record_current "$RECOVERY_IMAGE" || return 1
}
report_state() {
  local container state image
  container=$(app_container) || { log 'Current app is absent or cannot be inspected.'; return 1; }
  state=$(container_state "$container") || return 1
  image=$(docker inspect --format '{{.Image}}' "$container") || return 1
  log "Current app: container=$container state=$state image=$image"
}
on_error() {
  local code=$1 result='ROLLBACK FAILED'
  trap - ERR
  set +e
  log "Rollback failed during: $PHASE (exit $code)."
  if [[ "$REPLACING" = 1 && "$RECOVERY_SAFE" = 1 ]]; then
    log "Attempting one recovery to the verified pre-rollback image: $RECOVERY_IMAGE"
    if recover_once; then
      result='ROLLBACK FAILED; RECOVERY SUCCEEDED'
    else
      result='ROLLBACK FAILED; RECOVERY FAILED'
    fi
  elif [[ "$REPLACING" = 1 ]]; then
    log 'Recovery skipped: the pre-rollback app was not verified healthy. No return to an unhealthy image.'
  else
    log 'App replacement has not started; existing app was not replaced.'
  fi
  log "$result"
  printf '%s\n' "$result" > "$RUN_DIR/result"
  report_state || log 'Unable to inspect current app state; inspect Docker on EC2.'
  log "Requested image: $TARGET_IMAGE"
  log "Before: container=${OLD_CONTAINER:-absent} state=$OLD_STATE image=${OLD_IMAGE_ID:-none} local_tag=${RECOVERY_IMAGE:-none} recovery_verified=$RECOVERY_SAFE"
  log "Recovery journal: $RUN_DIR"
  exit "$code"
}
trap 'on_error $?' ERR
log "Recovery journal: $RUN_DIR"
printf '%s\n' "$TARGET_IMAGE" > "$RUN_DIR/requested-image"
OLD_CONTAINER=$("${COMPOSE[@]}" ps --all -q app)
[[ "$OLD_CONTAINER" != *$'\n'* ]] || die 'Multiple app containers found; refusing ambiguous replacement.'
if [[ -n "$OLD_CONTAINER" ]]; then
  OLD_IMAGE_ID=$(docker inspect --format '{{.Image}}' "$OLD_CONTAINER")
  OLD_STATE=$(container_state "$OLD_CONTAINER")
fi
printf 'container=%s\nimage=%s\nstate=%s\n' "$OLD_CONTAINER" "$OLD_IMAGE_ID" "$OLD_STATE" > "$RUN_DIR/before"
if [[ -n "$OLD_IMAGE_ID" ]]; then
  RECOVERY_IMAGE="honyeojok-backend-rollback:manual-${RUN_DIR##*.}"
  docker image tag "$OLD_IMAGE_ID" "$RECOVERY_IMAGE"
  printf '%s\n' "$RECOVERY_IMAGE" > "$RUN_DIR/before-image-tag"
  if [[ "$OLD_STATE" = running/healthy ]] && verify_app "$OLD_IMAGE_ID"; then
    RECOVERY_SAFE=1
  fi
fi
printf '%s\n' "$RECOVERY_SAFE" > "$RUN_DIR/recovery-verified"
log "Before: container=${OLD_CONTAINER:-absent} state=$OLD_STATE image=${OLD_IMAGE_ID:-none} recovery_verified=$RECOVERY_SAFE"

PHASE='ECR login using EC2 instance role'
env -i PATH="$PATH" HOME="$HOME" AWS_CONFIG_FILE=/dev/null \
  AWS_SHARED_CREDENTIALS_FILE=/dev/null AWS_EC2_METADATA_DISABLED=false AWS_PAGER='' \
  aws --region "$AWS_REGION" --cli-connect-timeout 10 --cli-read-timeout 30 \
  ecr get-login-password |
  docker login --username AWS --password-stdin "${TARGET_IMAGE%%/*}"
PHASE='pulling target app image'
"${COMPOSE[@]}" pull app </dev/null
TARGET_IMAGE_ID=$(docker image inspect --format '{{.Id}}' "$TARGET_IMAGE")
PHASE='app replacement and verification'
REPLACING=1
"${COMPOSE[@]}" up -d --no-deps --no-build --pull never --wait --wait-timeout 120 app </dev/null
verify_app "$TARGET_IMAGE_ID"
PHASE='recording successful rollback'
record_current "$TARGET_IMAGE"
printf '%s\n' 'ROLLBACK SUCCEEDED' > "$RUN_DIR/result"
trap - ERR
log "ROLLBACK SUCCEEDED: $TARGET_IMAGE"
