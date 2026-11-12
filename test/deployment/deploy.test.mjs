// Offline only: no AWS calls, Docker daemon, image push, or DB migration.
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import test from 'node:test';
import * as ssm from '../../scripts/deploy-ssm.mjs';

const IMAGE =
  '123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/backend@sha256:' +
  'b'.repeat(64);
const CONFIG = {
  AWS_REGION: 'ap-northeast-2',
  EC2_INSTANCE_ID: 'i-0123456789abcdef0',
  EC2_APP_DIR: "/home/ubuntu/a space's app",
  APP_IMAGE: IMAGE,
};
const COMMAND_ID = '12345678-1234-1234-1234-123456789abc';
const hash = (contents) => createHash('sha256').update(contents).digest('hex');
const read = (path) => fs.readFileSync(path, 'utf8');
const realFlock =
  spawnSync('sh', ['-c', 'command -v flock'], { encoding: 'utf8' }).status ===
  0;

function fixture(mode) {
  const base = fs.mkdtempSync(join(tmpdir(), 'deploy-test-'));
  const app = join(base, "app with 'quote");
  const bin = join(base, 'bin');
  fs.mkdirSync(app);
  fs.mkdirSync(bin);
  const compose = fs.readFileSync(join(ssm.ROOT, 'compose.ec2.yaml'));
  fs.writeFileSync(join(app, 'compose.ec2.yaml'), compose);
  fs.writeFileSync(join(app, '.env.local'), 'SECRET=not-for-logs\n');
  fs.writeFileSync(
    join(base, 'state.json'),
    JSON.stringify({ mode, runtime: 'old' }),
  );
  const mock = join(ssm.ROOT, 'test/deployment/fixtures/mock-command.cjs');
  for (const name of [
    'docker',
    'aws',
    'id',
    'sha256sum',
    'curl',
    'mv',
    ...(!realFlock ? ['flock'] : []),
  ]) {
    fs.writeFileSync(
      join(bin, name),
      `#!/usr/bin/env node\nrequire(${JSON.stringify(mock)});\n`,
      { mode: 0o755 },
    );
  }
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env.PATH}`,
    AWS_ACCESS_KEY_ID: 'fake-personal-key',
    AWS_PROFILE: 'fake-profile',
    AWS_WEB_IDENTITY_TOKEN_FILE: '/not-a-real-token',
  };
  const command = (overrides = {}) => [
    join(ssm.ROOT, 'scripts/deploy-ec2.sh'),
    app,
    overrides.image || IMAGE,
    CONFIG.AWS_REGION,
    overrides.checksum || hash(compose),
  ];
  return {
    base,
    app,
    env,
    command,
    cleanup: () => fs.rmSync(base, { recursive: true, force: true }),
    state: () => JSON.parse(read(join(base, 'state.json'))),
    events: () =>
      fs.existsSync(join(base, 'events'))
        ? read(join(base, 'events')).trim().split('\n').map(JSON.parse)
        : [],
    run(overrides) {
      const result = spawnSync('bash', command(overrides), {
        env,
        encoding: 'utf8',
        timeout: 15_000,
      });
      assert.ifError(result.error);
      assert.doesNotMatch(
        result.stdout + result.stderr,
        /not-for-logs|MOCK_AUTH_TOKEN/,
      );
      if (fs.existsSync(join(app, '.deploy')))
        assert.ok(
          !fs
            .readdirSync(join(app, '.deploy'))
            .some((name) => name.startsWith('session.')),
        );
      return result;
    },
  };
}

async function scenario(mode, check) {
  const f = fixture(mode);
  try {
    return await check(f);
  } finally {
    f.cleanup();
  }
}

test('host: successful deployment records digest after pull, migration and replacement', () =>
  scenario('success', (f) => {
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(read(join(f.app, '.deploy/current-image')).trim(), IMAGE);
    assert.equal(
      read(join(f.app, '.deploy/previous-image')).trim(),
      f.state().rollbackTag,
    );
    const ops = f
      .events()
      .filter(([name, args]) => name === 'docker' && args[0] === 'compose')
      .map(([, args]) => args[7]);
    assert.ok(
      ops.indexOf('pull') < ops.indexOf('run') &&
        ops.indexOf('run') < ops.indexOf('up'),
    );
  }));

test('host: pre-replacement failures leave the old app running', async (t) => {
  for (const mode of [
    'wrong_user',
    'missing_app',
    'old_health',
    'old_ready',
    'tag',
    'login',
    'pull',
    'image_lookup',
    'redis',
    'migration',
  ]) {
    await t.test(mode, () =>
      scenario(mode, (f) => {
        assert.notEqual(f.run().status, 0);
        assert.equal(f.state().runtime, 'old');
        assert.ok(!fs.existsSync(join(f.app, '.deploy/current-image')));
        assert.ok(
          !f
            .events()
            .some(
              ([name, args]) =>
                name === 'docker' && args[0] === 'compose' && args[7] === 'up',
            ),
        );
      }),
    );
  }
});

test('host: invalid digest, region or checksum never reach Docker', async (t) => {
  for (const overrides of [
    { checksum: '0'.repeat(64) },
    { image: IMAGE.split('@')[0] + ':latest' },
    { image: IMAGE.replace('ap-northeast-2', 'us-east-1') },
  ]) {
    await t.test(JSON.stringify(overrides), () =>
      scenario('success', (f) => {
        assert.notEqual(f.run(overrides).status, 0);
        assert.ok(!f.events().some(([name]) => name === 'docker'));
      }),
    );
  }
});

test('host: missing Compose or environment file fails before deployment', async (t) => {
  for (const file of ['compose.ec2.yaml', '.env.local'])
    await t.test(file, () =>
      scenario('success', (f) => {
        fs.unlinkSync(join(f.app, file));
        const result = f.run();
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /Missing\/read-protected/);
      }),
    );
});

test('host: replacement and verification failures recover actual previous image', async (t) => {
  for (const mode of ['up', 'health', 'image', 'ready', 'redirect', 'record'])
    await t.test(mode, () =>
      scenario(mode, (f) => {
        const result = f.run();
        assert.notEqual(result.status, 0);
        if (mode === 'up') assert.equal(result.status, 7);
        assert.match(result.stderr, /ROLLBACK SUCCEEDED/);
        assert.equal(f.state().runtime, 'rollback');
        assert.equal(
          read(join(f.app, '.deploy/current-image')).trim(),
          f.state().rollbackTag,
        );
      }),
    );
});

test('host: failures within recovery never report rollback success', async (t) => {
  for (const mode of [
    'rollback_up',
    'rollback_health',
    'rollback_image',
    'rollback_ready',
  ])
    await t.test(mode, () =>
      scenario(mode, (f) => {
        const result = f.run();
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /ROLLBACK FAILED/);
        assert.doesNotMatch(result.stderr, /ROLLBACK SUCCEEDED/);
      }),
    );
});

test('host: deployment lock remains held throughout rollback', () =>
  scenario('slow_rollback', async (f) => {
    const first = spawn('bash', f.command(), {
      env: f.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const completed = once(first, 'close');
    let stderr = '';
    first.stderr.setEncoding('utf8').on('data', (chunk) => {
      stderr += chunk;
    });
    first.stdout.resume();
    try {
      const deadline = performance.now() + 10_000;
      while (
        !fs.existsSync(join(f.base, 'recovering')) &&
        performance.now() < deadline &&
        first.exitCode === null
      )
        await delay(20);
      assert.ok(fs.existsSync(join(f.base, 'recovering')), stderr);
      const second = spawnSync('bash', f.command(), {
        env: f.env,
        encoding: 'utf8',
        timeout: 5000,
      });
      assert.notEqual(second.status, 0);
      assert.match(second.stderr, /holds .deploy\/deploy.lock/);
      const [code] = await completed;
      assert.notEqual(code, 0);
      assert.match(stderr, /ROLLBACK SUCCEEDED/);
    } finally {
      if (first.exitCode === null) {
        first.kill('SIGKILL');
        await completed;
      }
    }
  }));

test('runner: POSIX quoting preserves hostile argument text without executing it', () => {
  const value = "/app's path/$(touch bad); `id`";
  const result = spawnSync(
    'sh',
    ['-c', `printf '%s' ${ssm.shellQuote(value)}`],
    { encoding: 'utf8' },
  );
  assert.equal(result.status, 0);
  assert.equal(result.stdout, value);
});

test('runner: payload carries exact script and commit checksum, runs file as ubuntu', () => {
  const payload = ssm.parameters(CONFIG);
  const command = payload.commands[0];
  const encoded = command.match(/printf '%s' '([^']+)'/)[1];
  assert.deepEqual(
    Buffer.from(encoded, 'base64'),
    fs.readFileSync(join(ssm.ROOT, 'scripts/deploy-ec2.sh')),
  );
  for (const value of [
    CONFIG.EC2_APP_DIR,
    IMAGE,
    CONFIG.AWS_REGION,
    hash(fs.readFileSync(join(ssm.ROOT, 'compose.ec2.yaml'))),
  ])
    assert.ok(command.includes(ssm.shellQuote(value)));
  assert.match(command, /sudo -u ubuntu -H -- env -i/);
  assert.match(command, /bash "\$deploy_tmp\/deploy-ec2.sh".*<\/dev\/null/);
  assert.equal(spawnSync('sh', ['-n'], { input: command }).status, 0);
  assert.deepEqual(payload.executionTimeout, ['900']);
});

test('runner: invalid variables or mutable image tags are rejected', () => {
  assert.deepEqual(ssm.settings(CONFIG), CONFIG);
  for (const [key, value] of [
    ['AWS_REGION', 'x; id'],
    ['EC2_INSTANCE_ID', 'i-nope'],
    ['EC2_APP_DIR', '/bad\npath'],
    ['EC2_APP_DIR', 'relative'],
    ['APP_IMAGE', IMAGE.split('@')[0] + ':latest'],
    ['APP_IMAGE', IMAGE + '; id'],
  ]) {
    assert.throws(
      () => ssm.settings({ ...CONFIG, [key]: value }),
      ssm.DeployError,
    );
  }
});

const response = (Status = 'Success', ResponseCode = 0) => ({
  status: 0,
  stdout: JSON.stringify({ Status, ResponseCode }),
  stderr: '',
});
const missing = {
  status: 255,
  stdout: '',
  stderr: 'An error occurred (InvocationDoesNotExist)',
};
function observation(responses) {
  let now = 0;
  let calls = 0;
  const options = {
    callAws: () => {
      assert.ok(calls < responses.length, 'unexpected extra API retry');
      return responses[calls++];
    },
    now: () => now,
    delay: async (ms) => {
      now += ms;
    },
    log() {},
    error() {},
  };
  return {
    run: () => ssm.observe(CONFIG, COMMAND_ID, options),
    now: () => now,
    calls: () => calls,
  };
}

test('runner: initial eventual consistency and pending status eventually succeed', async () => {
  const f = observation([
    missing,
    response('Pending', -1),
    response('InProgress', -1),
    response(),
  ]);
  await f.run();
  assert.equal(f.calls(), 4);
});

test('runner: both remote Success and zero exit code are required', async () => {
  for (const [status, code] of [
    ['Success', 7],
    ['Failed', 0],
    ['TimedOut', -1],
    ['Cancelled', -1],
  ])
    await assert.rejects(
      observation([response(status, code)]).run(),
      ssm.DeployError,
    );
});

test('runner: permission errors fail immediately and consistency retries are bounded', async () => {
  const denied = observation([
    { status: 255, stdout: '', stderr: 'AccessDeniedException' },
  ]);
  await assert.rejects(denied.run(), /AccessDenied/);
  assert.equal(denied.calls(), 1);
  const initial = observation(Array(20).fill(missing));
  await assert.rejects(initial.run(), /GetCommandInvocation failed/);
  assert.equal(initial.now(), ssm.INVOCATION_GRACE);
  const disappeared = observation([response('InProgress', -1), missing]);
  await assert.rejects(disappeared.run(), /GetCommandInvocation failed/);
  assert.equal(disappeared.calls(), 2);
});

test('runner: waiting timeout does not claim remote execution was cancelled', async () => {
  const f = observation(Array(300).fill(response('InProgress', -1)));
  await assert.rejects(f.run(), /does NOT cancel/);
  assert.equal(f.now(), ssm.WAIT_TIMEOUT);
});

test('runner: sends payload, observes remote result, records summary and cleans up', async () => {
  const base = fs.mkdtempSync(join(tmpdir(), 'ssm-test-'));
  const environ = {
    ...CONFIG,
    RUNNER_TEMP: base,
    GITHUB_STEP_SUMMARY: join(base, 'summary'),
  };
  let observed = false;
  try {
    await ssm.main({
      environ,
      log() {},
      callAws(config, args) {
        assert.deepEqual(config, CONFIG);
        assert.deepEqual(args.slice(0, 2), ['ssm', 'send-command']);
        assert.ok(args.includes('120'));
        assert.ok(
          JSON.parse(
            read(join(base, 'ec2-deploy-parameters.json')),
          ).commands[0].includes('sudo -u ubuntu'),
        );
        return { status: 0, stdout: COMMAND_ID + '\n', stderr: '' };
      },
      async observeCommand(config, id) {
        assert.deepEqual(config, CONFIG);
        assert.equal(id, COMMAND_ID);
        observed = true;
      },
    });
    assert.ok(observed);
    assert.ok(read(environ.GITHUB_STEP_SUMMARY).includes(COMMAND_ID));
    assert.ok(read(environ.GITHUB_STEP_SUMMARY).includes(IMAGE));
    assert.ok(!fs.existsSync(join(base, 'ec2-deploy-parameters.json')));
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});

test('runner: send failure or API timeout never starts observation', async () => {
  for (const timeout of [false, true]) {
    const base = fs.mkdtempSync(join(tmpdir(), 'ssm-test-'));
    try {
      let observed = false;
      await assert.rejects(
        ssm.main({
          environ: {
            ...CONFIG,
            RUNNER_TEMP: base,
            GITHUB_STEP_SUMMARY: join(base, 'summary'),
          },
          log() {},
          callAws() {
            if (timeout)
              throw Object.assign(new Error('timed out'), {
                code: 'ETIMEDOUT',
              });
            return { status: 255, stdout: '', stderr: 'AccessDeniedException' };
          },
          async observeCommand() {
            observed = true;
          },
        }),
        timeout ? /may have been accepted/ : /AccessDenied/,
      );
      assert.equal(observed, false);
      assert.ok(!fs.existsSync(join(base, 'ec2-deploy-parameters.json')));
    } finally {
      fs.rmSync(base, { recursive: true, force: true });
    }
  }
});

test('runner: remote failure keeps command ID and inspection instructions', async () => {
  const base = fs.mkdtempSync(join(tmpdir(), 'ssm-test-'));
  const logs = [];
  try {
    await assert.rejects(
      ssm.main({
        environ: {
          ...CONFIG,
          RUNNER_TEMP: base,
          GITHUB_STEP_SUMMARY: join(base, 'summary'),
        },
        log: (line) => logs.push(line),
        callAws: () => ({ status: 0, stdout: COMMAND_ID, stderr: '' }),
        async observeCommand() {
          throw new ssm.DeployError('remote failed');
        },
      }),
      /remote failed/,
    );
    assert.ok(read(join(base, 'summary')).includes(COMMAND_ID));
    assert.ok(
      logs.some(
        (line) =>
          line.includes('get-command-invocation') && line.includes(COMMAND_ID),
      ),
    );
    assert.ok(!fs.existsSync(join(base, 'ec2-deploy-parameters.json')));
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});

test('runner: AWS CLI uses argument arrays without shell and has bounded execution', () => {
  const expected = response();
  const result = ssm.aws(
    CONFIG,
    ['ssm', 'get-command-invocation'],
    (file, args, options) => {
      assert.equal(file, 'aws');
      assert.ok(args.includes('get-command-invocation'));
      assert.equal(options.shell, false);
      assert.equal(options.timeout, 90_000);
      assert.equal(options.killSignal, 'SIGKILL');
      assert.equal(options.env.AWS_MAX_ATTEMPTS, '2');
      return expected;
    },
  );
  assert.equal(result, expected);
});

test('workflow: external HTTP 200 succeeds; redirect and HTTP error fail', () => {
  const workflow = read(join(ssm.ROOT, '.github/workflows/aws-lab-auth.yml'));
  // This is the final step: extract its literal run block without a YAML dependency.
  const section = workflow.split(
    '      - name: Check external HTTPS readiness\n',
  )[1];
  assert.ok(section);
  const command = section.split('        run: |\n')[1].replace(/^ {10}/gm, '');
  const base = fs.mkdtempSync(join(tmpdir(), 'https-test-'));
  try {
    fs.writeFileSync(
      join(base, 'curl'),
      '#!/usr/bin/env bash\nprintf "%s" "$MOCK_HTTP"\nexit "$MOCK_EXIT"\n',
      { mode: 0o755 },
    );
    for (const [http, exit, success] of [
      ['200', '0', true],
      ['302', '0', false],
      ['503', '22', false],
    ]) {
      const result = spawnSync('bash', ['-c', command], {
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${base}:${process.env.PATH}`,
          MOCK_HTTP: http,
          MOCK_EXIT: exit,
          GITHUB_STEP_SUMMARY: join(base, 'summary'),
        },
      });
      assert.equal(result.status === 0, success, result.stderr);
    }
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});
