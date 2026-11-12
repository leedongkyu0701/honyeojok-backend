#!/usr/bin/env bash
# Runs on Ubuntu EC2 as ubuntu, never inside the application or on the runner.
# Migrations must remain compatible with the previous app; DB rollback is manual.
# Single-container replacement may briefly interrupt service. Abrupt termination
# or host failure can prevent recovery; manual rollback must use the same lock.
set -Eeuo pipefail
umask 077

log() { printf '%s\n' "$*" >&2; }
die() { log "ERROR: $*"; exit 1; }

[[ $# -eq 4 ]] || die 'Usage: deploy-ec2.sh ABS_APP_DIR ECR_IMAGE@sha256:DIGEST AWS_REGION COMPOSE_SHA256'
APP_DIR=$1
NEW_IMAGE=$2
AWS_REGION=$3
EXPECTED_COMPOSE_SHA=$4
[[ "$APP_DIR" = /* && "$APP_DIR" != / && ! "$APP_DIR" =~ [[:cntrl:]] ]] || die 'App directory must be an absolute non-root path without control characters.'
[[ "$AWS_REGION" =~ ^[a-z]{2}(-[a-z]+)+-[0-9]+$ ]] || die 'Invalid AWS region.'
[[ "$EXPECTED_COMPOSE_SHA" =~ ^[a-f0-9]{64}$ ]] || die 'Invalid Compose SHA-256 checksum.'
REGISTRY=${NEW_IMAGE%%/*}
[[ "$REGISTRY" =~ ^[0-9]{12}\.dkr\.ecr\.([a-z0-9-]+)\.amazonaws\.com(\.cn)?$ ]] || die 'Expected a private ECR registry.'
[[ "${BASH_REMATCH[1]}" = "$AWS_REGION" ]] || die 'Image registry and AWS region differ.'
[[ "$NEW_IMAGE" =~ ^[0-9]{12}\.dkr\.ecr\.[a-z0-9-]+\.amazonaws\.com(\.cn)?/[a-z0-9][a-z0-9._/-]*@sha256:[a-f0-9]{64}$ ]] || die 'Image must be pinned to an ECR sha256 digest.'
[[ "$(id -un)" = ubuntu ]] || die 'Run this script as ubuntu (not the SSM default root user).'
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
[[ "${ACTUAL_COMPOSE_SHA%% *}" = "$EXPECTED_COMPOSE_SHA" ]] || die 'Compose checksum differs from the workflow commit. Synchronize it deliberately before deploying; no app was changed.'

WORK_DIR=$(mktemp -d "$PWD/.deploy/session.XXXXXXXXXX")
# Do not persist ECR credentials or use an existing Docker credential helper.
export DOCKER_CONFIG="$WORK_DIR/docker"
mkdir "$DOCKER_CONFIG"
cleanup() { rm -rf -- "$WORK_DIR"; }
trap cleanup EXIT
export APP_IMAGE="$NEW_IMAGE"
COMPOSE=(docker compose --env-file .env.local -p honyeojok-backend -f compose.ec2.yaml)
READY_URL=http://127.0.0.1:5001/health/ready
REPLACING=0
PHASE='existing app checks'

# Explicit guards are required: these functions also run in an if/|| context
# during rollback, where Bash disables errexit and ERR traps inside functions.
healthy_container() {
  local service=$1 container state
  container=$("${COMPOSE[@]}" ps --all -q "$service") || return 1
  if [[ -z "$container" || "$container" = *$'\n'* ]]; then
    log "Expected exactly one $service container; found none or multiple. Inspect docker compose ps --all."
    return 1
  fi
  state=$(docker inspect --format '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$container") || return 1
  if [[ "$state" != running/healthy ]]; then
    log "$service container $container is $state; inspect its health before retrying."
    return 1
  fi
  printf '%s\n' "$container"
}
readiness() {
  local status
  status=$(curl --fail --silent --show-error --connect-timeout 3 --max-time 10 \
    --retry 5 --retry-delay 2 --retry-connrefused --retry-all-errors \
    --output /dev/null --write-out "%{http_code}" "$READY_URL") || return 1
  [[ "$status" = 200 ]] || { log "Internal readiness returned HTTP $status (expected 200)."; return 1; }
}
verify_app() {
  local expected=$1 container actual
  container=$(healthy_container app) || return 1
  actual=$(docker inspect --format '{{.Image}}' "$container") || return 1
  [[ "$actual" = "$expected" ]] || { log 'Running app image ID differs from the expected image.'; return 1; }
  readiness || return 1
}
record_image() {
  local destination=$1 image=$2
  printf '%s\n' "$image" > "$WORK_DIR/image" || return 1
  mv -f -- "$WORK_DIR/image" ".deploy/$destination" || return 1
}
rollback() {
  export APP_IMAGE="$ROLLBACK_IMAGE"
  "${COMPOSE[@]}" up -d --no-deps --no-build --pull never --wait --wait-timeout 120 app </dev/null || return 1
  verify_app "$OLD_IMAGE_ID" || return 1
  record_image current-image "$ROLLBACK_IMAGE" || return 1
}
on_error() {
  local code=$1
  trap - ERR
  set +e
  log "Deployment failed during: $PHASE (exit $code)."
  if [[ "$REPLACING" = 1 ]]; then
    log "Restoring local image: $ROLLBACK_IMAGE"
    if rollback; then
      log 'ROLLBACK SUCCEEDED: previous image, Compose health and internal readiness verified.'
    else
      log 'ROLLBACK FAILED: inspect the EC2 app and .deploy/previous-image immediately.'
    fi
  else
    log 'App replacement has not started; the existing app was not replaced.'
  fi
  # A recovered deployment is still a failed deployment.
  exit "$code"
}
trap 'on_error $?' ERR

OLD_CONTAINER=$(healthy_container app)
readiness
OLD_IMAGE_ID=$(docker inspect --format '{{.Image}}' "$OLD_CONTAINER")
ROLLBACK_IMAGE="honyeojok-backend-rollback:${WORK_DIR##*.}"
docker image tag "$OLD_IMAGE_ID" "$ROLLBACK_IMAGE"
record_image previous-image "$ROLLBACK_IMAGE"

PHASE='ECR login using EC2 instance role'
log "$PHASE"
# Start with a clean AWS environment: only IMDS instance-role credentials may be
# used, even if the ubuntu account has a personal AWS profile/access key.
env -i PATH="$PATH" HOME="$HOME" AWS_CONFIG_FILE=/dev/null \
  AWS_SHARED_CREDENTIALS_FILE=/dev/null AWS_EC2_METADATA_DISABLED=false AWS_PAGER='' \
  aws --region "$AWS_REGION" --cli-connect-timeout 10 --cli-read-timeout 30 \
  ecr get-login-password |
  docker login --username AWS --password-stdin "$REGISTRY"

PHASE='pulling app and migrate images'
log "$PHASE"
"${COMPOSE[@]}" pull app migrate </dev/null
EXPECTED_IMAGE_ID=$(docker image inspect --format '{{.Id}}' "$NEW_IMAGE")
PHASE='Redis health check'
healthy_container redis >/dev/null
PHASE='database migration (no automatic migration:revert)'
log "$PHASE"
"${COMPOSE[@]}" run --rm --no-deps --pull never -T --interactive=false migrate </dev/null

# Arm recovery BEFORE up: a failed up may already have removed the old app.
PHASE='app replacement and verification'
REPLACING=1
"${COMPOSE[@]}" up -d --no-deps --no-build --pull never --wait --wait-timeout 120 app </dev/null
verify_app "$EXPECTED_IMAGE_ID"
PHASE='recording successful image'
record_image current-image "$NEW_IMAGE"
trap - ERR
log "DEPLOYMENT SUCCEEDED: $NEW_IMAGE"
