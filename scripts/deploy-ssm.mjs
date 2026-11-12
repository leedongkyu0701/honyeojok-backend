#!/usr/bin/env node
// GitHub Runner only: transfer the checked-out Bash script and observe SSM.
// Uses Node.js 24 built-ins; never executes the EC2 script on the runner.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  appendFileSync,
  chmodSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// AWS also considers executionTimeout when calculating delivery expiration.
export const DELIVERY_TIMEOUT = 120;
export const EXECUTION_TIMEOUT = 900;
export const WAIT_TIMEOUT = 1_200_000;
export const INVOCATION_GRACE = 60_000;
export const POLL_INTERVAL = 5_000;

export class DeployError extends Error {}

export function settings(environ) {
  const names = ['AWS_REGION', 'EC2_INSTANCE_ID', 'EC2_APP_DIR', 'APP_IMAGE'];
  const config = Object.fromEntries(
    names.map((name) => [name, environ[name] || '']),
  );
  // eslint-disable-next-line no-control-regex -- Reject control characters in deployment arguments.
  const controlCharacters = /[\x00-\x1f\x7f]/;
  if (names.some((name) => controlCharacters.test(config[name]))) {
    throw new DeployError(
      'Deployment variables must not contain control characters.',
    );
  }
  if (!names.every((name) => config[name])) {
    throw new DeployError(`Set ${names.join(', ')}.`);
  }
  if (!/^[a-z]{2}(?:-[a-z]+)+-[0-9]+$/.test(config.AWS_REGION)) {
    throw new DeployError('Invalid AWS_REGION.');
  }
  if (!/^i-(?:[0-9a-f]{8}|[0-9a-f]{17})$/.test(config.EC2_INSTANCE_ID)) {
    throw new DeployError('Invalid EC2_INSTANCE_ID.');
  }
  if (
    !config.EC2_APP_DIR.startsWith('/') ||
    config.EC2_APP_DIR === '/' ||
    controlCharacters.test(config.EC2_APP_DIR)
  ) {
    throw new DeployError(
      'EC2_APP_DIR must be an absolute non-root path without control characters.',
    );
  }
  const image = config.APP_IMAGE.match(
    /^[0-9]{12}\.dkr\.ecr\.([a-z0-9-]+)\.amazonaws\.com(?:\.cn)?\/[a-z0-9][a-z0-9._/-]*@sha256:[a-f0-9]{64}$/,
  );
  if (!image || image[1] !== config.AWS_REGION) {
    throw new DeployError(
      'APP_IMAGE must be a private ECR digest in AWS_REGION.',
    );
  }
  return config;
}

// POSIX shell quoting is only for the remote /bin/sh command. Local AWS CLI
// arguments are passed directly as an array with shell:false.
export function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

export function parameters(config, root = ROOT) {
  const encoded = readFileSync(join(root, 'scripts/deploy-ec2.sh')).toString(
    'base64',
  );
  const checksum = createHash('sha256')
    .update(readFileSync(join(root, 'compose.ec2.yaml')))
    .digest('hex');
  const args = [
    config.EC2_APP_DIR,
    config.APP_IMAGE,
    config.AWS_REGION,
    checksum,
  ]
    .map(shellQuote)
    .join(' ');
  // SSM defaults to root. Save a private file and run Bash as ubuntu with stdin
  // closed, so docker and migrations cannot consume the remaining script body.
  const command = [
    'set -eu',
    'umask 077',
    'deploy_tmp="$(mktemp -d /tmp/honyeojok-deploy.XXXXXXXXXX)"',
    'trap \'rm -rf -- "$deploy_tmp"\' 0',
    `printf '%s' ${shellQuote(encoded)} | base64 --decode > "$deploy_tmp/deploy-ec2.sh"`,
    'chown -R ubuntu:ubuntu "$deploy_tmp"',
    'chmod 700 "$deploy_tmp" "$deploy_tmp/deploy-ec2.sh"',
    'set +e',
    'sudo -u ubuntu -H -- env -i HOME=/home/ubuntu USER=ubuntu LOGNAME=ubuntu ' +
      `PATH=/usr/local/bin:/usr/bin:/bin:/snap/bin bash "$deploy_tmp/deploy-ec2.sh" ${args} </dev/null`,
    'deploy_status=$?',
    'exit "$deploy_status"',
  ].join('\n');
  const result = {
    commands: [command],
    executionTimeout: [String(EXECUTION_TIMEOUT)],
  };
  if (Buffer.byteLength(JSON.stringify(result)) > 24_000) {
    throw new DeployError(
      'SSM script payload exceeds the conservative 24 KB limit.',
    );
  }
  return result;
}

export function aws(config, args, run = spawnSync) {
  const result = run(
    'aws',
    [
      '--region',
      config.AWS_REGION,
      '--no-cli-pager',
      '--cli-connect-timeout',
      '10',
      '--cli-read-timeout',
      '30',
      ...args,
    ],
    {
      encoding: 'utf8',
      shell: false,
      timeout: 90_000,
      killSignal: 'SIGKILL',
      env: {
        ...process.env,
        AWS_MAX_ATTEMPTS: '2',
        AWS_RETRY_MODE: 'standard',
      },
    },
  );
  if (result.error) throw result.error;
  return result;
}

export function inspectionCommand(config, commandId) {
  return [
    'aws',
    'ssm',
    'get-command-invocation',
    '--region',
    config.AWS_REGION,
    '--command-id',
    commandId,
    '--instance-id',
    config.EC2_INSTANCE_ID,
  ]
    .map(shellQuote)
    .join(' ');
}

export async function observe(
  config,
  commandId,
  {
    callAws = aws,
    now = () => performance.now(),
    delay = sleep,
    log = console.log,
    error = console.error,
  } = {},
) {
  const start = now();
  let seen = false;
  let lastStatus;
  while (now() - start < WAIT_TIMEOUT) {
    const result = callAws(config, [
      'ssm',
      'get-command-invocation',
      '--command-id',
      commandId,
      '--instance-id',
      config.EC2_INSTANCE_ID,
      '--output',
      'json',
    ]);
    if (result.status !== 0) {
      if (
        !seen &&
        result.stderr.includes('(InvocationDoesNotExist)') &&
        now() - start < INVOCATION_GRACE
      ) {
        await delay(POLL_INTERVAL);
        continue;
      }
      throw new DeployError(
        `GetCommandInvocation failed: ${result.stderr.trim()}`,
      );
    }
    const invocation = JSON.parse(result.stdout);
    seen = true;
    const status = invocation.Status;
    if (status !== lastStatus) {
      log(`SSM status: ${status}`);
      lastStatus = status;
    }
    if (['Pending', 'InProgress', 'Delayed', 'Cancelling'].includes(status)) {
      await delay(POLL_INTERVAL);
      continue;
    }
    // Print only bounded remote command output, never env/config dumps.
    log(invocation.StandardOutputContent || '');
    error(invocation.StandardErrorContent || '');
    if (status !== 'Success' || invocation.ResponseCode !== 0) {
      throw new DeployError(
        `Remote deployment failed: status=${status}, exit=${invocation.ResponseCode}`,
      );
    }
    return;
  }
  throw new DeployError(
    `SSM observation timed out after ${WAIT_TIMEOUT / 1000}s. ` +
      'The remote command may still be running; this does NOT cancel it. Inspect its status before deploying again.',
  );
}

export async function main({
  environ = process.env,
  root = ROOT,
  callAws = aws,
  observeCommand = observe,
  log = console.log,
} = {}) {
  const config = settings(environ);
  if (!environ.RUNNER_TEMP || !environ.GITHUB_STEP_SUMMARY) {
    throw new DeployError('RUNNER_TEMP and GITHUB_STEP_SUMMARY are required.');
  }
  // Keep transfer files outside the Docker build context.
  const payload = join(environ.RUNNER_TEMP, 'ec2-deploy-parameters.json');
  writeFileSync(payload, JSON.stringify(parameters(config, root)), {
    mode: 0o600,
  });
  chmodSync(payload, 0o600);
  let commandId;
  try {
    let result;
    try {
      result = callAws(config, [
        'ssm',
        'send-command',
        '--instance-ids',
        config.EC2_INSTANCE_ID,
        '--document-name',
        'AWS-RunShellScript',
        '--comment',
        'GitHub Actions AWS lab deployment',
        '--timeout-seconds',
        String(DELIVERY_TIMEOUT),
        '--parameters',
        `file://${payload}`,
        '--query',
        'Command.CommandId',
        '--output',
        'text',
      ]);
    } catch (error) {
      if (error.code === 'ETIMEDOUT') {
        throw new DeployError(
          'SendCommand API timed out. The request may have been accepted; ' +
            'inspect Systems Manager Run Command before retrying.',
        );
      }
      throw error;
    }
    if (result.status !== 0)
      throw new DeployError(`SendCommand failed: ${result.stderr.trim()}`);
    const returnedId = result.stdout.trim();
    if (!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(returnedId)) {
      throw new DeployError('SSM returned an invalid Command ID.');
    }
    commandId = returnedId;
    log(`SSM Command ID: ${commandId}\nAPP_IMAGE: ${config.APP_IMAGE}`);
    appendFileSync(
      environ.GITHUB_STEP_SUMMARY,
      `\nSSM Command ID: \`${commandId}\`\n\nTarget instance: \`${config.EC2_INSTANCE_ID}\`\n\n` +
        `Deployment image: \`${config.APP_IMAGE}\`\n`,
    );
    await observeCommand(config, commandId, { callAws, log });
  } finally {
    if (commandId) {
      log(
        'Check command status (also after runner cancellation or timeout):\n' +
          inspectionCommand(config, commandId),
      );
    }
    unlinkSync(payload);
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
  });
}
