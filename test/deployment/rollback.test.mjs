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
import { fixture, LAB_IMAGE } from './fixtures/host-fixture.mjs';

const read = (path) => fs.readFileSync(path, 'utf8');
const CONFIG = {
  AWS_REGION: 'ap-northeast-2',
  ECR_REPOSITORY: 'honyeojok-backend-lab',
  EC2_INSTANCE_ID: 'i-0123456789abcdef0',
  EC2_APP_DIR: '/home/ubuntu/honyeojok-backend',
  APP_IMAGE: LAB_IMAGE,
};
const COMMAND_ID = '12345678-1234-1234-1234-123456789abc';

async function scenario(mode, check, options = {}) {
  const f = fixture(mode, { operation: 'rollback', ...options });
  fs.mkdirSync(join(f.app, '.deploy'));
  fs.writeFileSync(
    join(f.app, '.deploy/previous-image'),
    'known-healthy-deploy-tag\n',
  );
  fs.writeFileSync(
    join(f.app, '.deploy/current-image'),
    'last-confirmed-image\n',
  );
  try {
    await check(f);
    assert.equal(
      read(join(f.app, '.deploy/previous-image')),
      'known-healthy-deploy-tag\n',
    );
    for (const name of fs
      .readdirSync(join(f.app, '.deploy'))
      .filter((name) => name.startsWith('rollback.'))) {
      assert.ok(
        !fs.existsSync(join(f.app, '.deploy', name, 'docker')),
        'ECR credentials must be cleaned up',
      );
    }
    for (const [name, args] of f.events()) {
      if (name !== 'docker' || args[0] !== 'compose') continue;
      assert.ok(
        ['ps', 'pull', 'up'].includes(args[7]),
        'No migrate/run/build/down allowed',
      );
      assert.equal(args.at(-1), 'app', 'Only app is targeted');
    }
  } finally {
    f.cleanup();
  }
}
function journal(f) {
  const names = fs
    .readdirSync(join(f.app, '.deploy'))
    .filter((name) => name.startsWith('rollback.'));
  assert.equal(names.length, 1);
  return join(f.app, '.deploy', names[0]);
}
const ups = (f) =>
  f
    .events()
    .filter(
      ([name, args]) =>
        name === 'docker' && args[0] === 'compose' && args[7] === 'up',
    );

test('rollback: replaces only app, records digest and preserves previous-image', () =>
  scenario('success', (f) => {
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(read(join(f.app, '.deploy/current-image')).trim(), LAB_IMAGE);
    assert.match(read(join(journal(f), 'before')), /image=sha256:a{64}/);
    assert.equal(read(join(journal(f), 'recovery-verified')).trim(), '1');
    assert.equal(ups(f).length, 1);
  }));

test('rollback: unhealthy, stopped, missing and readiness-failing apps can be replaced', async (t) => {
  for (const [mode, options] of [
    ['old_health', {}],
    ['success', { oldState: 'exited/unhealthy' }],
    ['missing_app', {}],
    ['old_ready', {}],
  ]) {
    await t.test(mode + JSON.stringify(options), () =>
      scenario(
        mode,
        (f) => {
          const result = f.run();
          assert.equal(result.status, 0, result.stderr);
          assert.equal(
            read(join(f.app, '.deploy/current-image')).trim(),
            LAB_IMAGE,
          );
          assert.equal(read(join(journal(f), 'recovery-verified')).trim(), '0');
          assert.equal(ups(f).length, 1);
        },
        options,
      ),
    );
  }
});

test('rollback: login/pull failure never replaces the app or changes current-image', async (t) => {
  for (const mode of ['login', 'pull'])
    await t.test(mode, () =>
      scenario(mode, (f) => {
        const result = f.run();
        assert.notEqual(result.status, 0);
        assert.equal(f.state().runtime, 'old');
        assert.equal(ups(f).length, 0);
        assert.equal(
          read(join(f.app, '.deploy/current-image')).trim(),
          'last-confirmed-image',
        );
        assert.match(result.stderr, /Recovery journal:/);
      }),
    );
});

test('rollback: failed target may recover once to a verified healthy starting image', async (t) => {
  for (const mode of ['up', 'image', 'health', 'ready', 'redirect', 'record'])
    await t.test(mode, () =>
      scenario(mode, (f) => {
        const result = f.run();
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /ROLLBACK FAILED; RECOVERY SUCCEEDED/);
        assert.equal(ups(f).length, 2);
        assert.equal(
          read(join(f.app, '.deploy/current-image')).trim(),
          f.state().rollbackTag,
        );
        assert.match(
          result.stderr,
          /Current app:.*state=running\/healthy.*image=sha256:a{64}/,
        );
      }),
    );
});

test('rollback: target failure never restores an unhealthy or unready starting app', async (t) => {
  for (const options of [
    { oldState: 'running/unhealthy' },
    { oldReady: false },
  ]) {
    await t.test(JSON.stringify(options), () =>
      scenario(
        'health',
        (f) => {
          const result = f.run();
          assert.notEqual(result.status, 0);
          assert.match(result.stderr, /Recovery skipped/);
          assert.equal(ups(f).length, 1);
          assert.equal(
            read(join(f.app, '.deploy/current-image')).trim(),
            'last-confirmed-image',
          );
        },
        options,
      ),
    );
  }
});

test('rollback: failed recovery is reported and not retried', async (t) => {
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
        assert.match(result.stderr, /RECOVERY FAILED/);
        assert.doesNotMatch(result.stderr, /RECOVERY SUCCEEDED/);
        assert.equal(ups(f).length, 2);
        assert.equal(
          read(join(f.app, '.deploy/current-image')).trim(),
          'last-confirmed-image',
        );
      }),
    );
});

const invalidImages = [
  LAB_IMAGE.replace('939898395322', '123456789012'),
  LAB_IMAGE.replace('honyeojok-backend-lab', 'other-repository'),
  LAB_IMAGE.replace('ap-northeast-2', 'us-east-1'),
  LAB_IMAGE.split('@')[0] + ':latest',
  LAB_IMAGE + '; id',
  LAB_IMAGE + '$(id)',
  LAB_IMAGE + '\n',
  LAB_IMAGE + ' ',
  LAB_IMAGE.slice(0, -1),
  LAB_IMAGE.slice(0, -1) + 'A',
];
test('rollback: runner and EC2 reject invalid digests/repositories/injection before side effects', async (t) => {
  for (const image of invalidImages)
    await t.test(JSON.stringify(image), () =>
      scenario('success', (f) => {
        assert.throws(
          () => ssm.settings({ ...CONFIG, APP_IMAGE: image }, 'rollback'),
          ssm.DeployError,
        );
        const result = f.run({ image });
        assert.notEqual(result.status, 0);
        assert.ok(
          !f.events().some(([name]) => name === 'aws' || name === 'docker'),
        );
      }),
    );
  assert.throws(
    () => ssm.settings({ ...CONFIG, ECR_REPOSITORY: 'other' }, 'rollback'),
    ssm.DeployError,
  );
});

test('rollback: checksum mismatch and missing files fail without replacing app', async (t) => {
  for (const file of ['compose.ec2.yaml', '.env.local', 'checksum'])
    await t.test(file, () =>
      scenario('success', (f) => {
        if (file !== 'checksum') fs.unlinkSync(join(f.app, file));
        const result = f.run(
          file === 'checksum' ? { checksum: '0'.repeat(64) } : {},
        );
        assert.notEqual(result.status, 0);
        assert.equal(ups(f).length, 0);
        assert.ok(!f.events().some(([name]) => name === 'docker'));
      }),
    );
});

test('rollback and deploy exclude one another using the same lock throughout recovery', async (t) => {
  for (const firstMode of ['deploy', 'rollback'])
    await t.test(firstMode + ' holds lock', async () => {
      const f = fixture('slow_rollback', { operation: firstMode });
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
          first.exitCode === null &&
          performance.now() < deadline
        )
          await delay(20);
        assert.ok(fs.existsSync(join(f.base, 'recovering')), stderr);
        const second = spawnSync(
          'bash',
          f.command({
            operation: firstMode === 'deploy' ? 'rollback' : 'deploy',
            image: LAB_IMAGE,
          }),
          { env: f.env, encoding: 'utf8', timeout: 5000 },
        );
        assert.notEqual(second.status, 0);
        assert.match(second.stderr, /holds .deploy\/deploy.lock/);
        assert.notEqual((await completed)[0], 0);
      } finally {
        if (first.exitCode === null) {
          first.kill('SIGKILL');
          await completed;
        }
        f.cleanup();
      }
    });
});

test('SSM: mode is allowlisted, defaults to deploy, and transfers the matching script', () => {
  assert.equal(ssm.modeFromArgs([]), 'deploy');
  for (const mode of ['deploy', 'rollback']) {
    assert.equal(ssm.modeFromArgs([mode]), mode);
    const config = ssm.settings(CONFIG, mode);
    const payload = ssm.parameters(config, ssm.ROOT, mode);
    const command = payload.commands[0];
    const encoded = command.match(/printf '%s' '([^']+)'/)[1];
    assert.deepEqual(
      Buffer.from(encoded, 'base64'),
      fs.readFileSync(join(ssm.ROOT, `scripts/${mode}-ec2.sh`)),
    );
    assert.ok(command.includes(`bash "$deploy_tmp/${mode}-ec2.sh"`));
    assert.ok(command.includes('PATH=/usr/local/bin:/usr/bin:/bin:/snap/bin'));
    assert.ok(
      command.includes(
        createHash('sha256')
          .update(fs.readFileSync(join(ssm.ROOT, 'compose.ec2.yaml')))
          .digest('hex'),
      ),
    );
    assert.equal(spawnSync('sh', ['-n'], { input: command }).status, 0);
  }
  for (const mode of [
    '',
    '../script',
    'rollback; id',
    '__proto__',
    'constructor',
  ]) {
    assert.throws(() => ssm.modeFromArgs([mode]), ssm.DeployError);
    assert.throws(
      () => ssm.parameters(CONFIG, ssm.ROOT, mode),
      ssm.DeployError,
    );
  }
  assert.throws(() => ssm.modeFromArgs(['rollback', 'extra']), ssm.DeployError);
});

test('SSM: rollback completion, failure and observation error appear in Summary with command ID', async (t) => {
  for (const outcome of ['Success', 'Failed', 'wrong-exit', 'AccessDenied'])
    await t.test(outcome, async () => {
      const base = fs.mkdtempSync(join(tmpdir(), 'rollback-ssm-'));
      const environ = {
        ...CONFIG,
        RUNNER_TEMP: base,
        GITHUB_STEP_SUMMARY: join(base, 'summary'),
        GITHUB_OUTPUT: join(base, 'output'),
      };
      let calls = 0;
      try {
        const operation = ssm.main({
          environ,
          mode: 'rollback',
          log() {},
          callAws(config, args) {
            calls++;
            if (args[1] === 'send-command') {
              const command = JSON.parse(
                read(join(base, 'ec2-deploy-parameters.json')),
              ).commands[0];
              assert.ok(command.includes('rollback-ec2.sh'));
              return { status: 0, stdout: COMMAND_ID, stderr: '' };
            }
            assert.equal(args[1], 'get-command-invocation');
            if (outcome === 'AccessDenied')
              return {
                status: 255,
                stdout: '',
                stderr: 'AccessDeniedException',
              };
            return {
              status: 0,
              stdout: JSON.stringify({
                Status: outcome === 'Failed' ? 'Failed' : 'Success',
                ResponseCode: outcome === 'Success' ? 0 : 7,
              }),
              stderr: '',
            };
          },
        });
        if (outcome === 'Success') await operation;
        else await assert.rejects(operation, ssm.DeployError);
        assert.equal(calls, 2);
        const summary = read(environ.GITHUB_STEP_SUMMARY);
        assert.ok(
          summary.includes(LAB_IMAGE) &&
            summary.includes(COMMAND_ID) &&
            summary.includes(CONFIG.EC2_INSTANCE_ID),
        );
        assert.ok(
          summary.includes(
            outcome === 'Success'
              ? 'Remote execution succeeded'
              : 'failed or not confirmed',
          ),
        );
        assert.equal(
          read(environ.GITHUB_OUTPUT).trim(),
          `command_id=${COMMAND_ID}`,
        );
        assert.ok(!fs.existsSync(join(base, 'ec2-deploy-parameters.json')));
      } finally {
        fs.rmSync(base, { recursive: true, force: true });
      }
    });
});

const workflow = read(join(ssm.ROOT, '.github/workflows/aws-lab-rollback.yml'));
function runBlock(name) {
  const step = workflow
    .split(`      - name: ${name}\n`)[1]
    ?.split('\n      - name: ')[0];
  assert.ok(step, name);
  return step.split('        run: |\n')[1].replace(/^ {10}/gm, '');
}
test('workflow: manual input is validated before OIDC; deploy branch/concurrency and versions match', () => {
  assert.match(
    workflow,
    /workflow_dispatch:\s+inputs:\s+app_image:[\s\S]+required: true\s+type: string/,
  );
  assert.match(
    workflow,
    /if: github.ref == 'refs\/heads\/infra\/aws-manual-lab'/,
  );
  assert.match(workflow, /group: aws-lab-deploy\s+cancel-in-progress: false/);
  assert.match(workflow, /environment: aws-lab/);
  assert.match(workflow, /APP_IMAGE: \$\{\{ inputs.app_image \}\}/);
  const deploy = read(join(ssm.ROOT, '.github/workflows/aws-lab-auth.yml'));
  for (const action of workflow.matchAll(/uses: (.+)/g))
    assert.ok(deploy.includes(action[0]));
  assert.ok(
    workflow.indexOf('Validate rollback input') <
      workflow.indexOf('Authenticate to AWS'),
  );
  assert.doesNotMatch(
    workflow,
    /docker build|docker push|migration:run|npm ci/,
  );
  for (const name of [
    'Validate rollback input',
    'Check external HTTPS readiness',
    'Write rollback result',
  ])
    assert.ok(!runBlock(name).includes('${{'));
});
test('workflow: invalid digest is rejected by actual validation step without AWS calls', () => {
  const result = spawnSync(
    'bash',
    ['-c', runBlock('Validate rollback input')],
    {
      cwd: ssm.ROOT,
      env: { ...process.env, ...CONFIG, APP_IMAGE: LAB_IMAGE + '; id' },
      encoding: 'utf8',
    },
  );
  assert.notEqual(result.status, 0);
  assert.equal(
    spawnSync('bash', ['-c', runBlock('Validate rollback input')], {
      cwd: ssm.ROOT,
      env: { ...process.env, ...CONFIG },
      encoding: 'utf8',
    }).status,
    0,
  );
});
test('workflow: external HTTP 200 only; Summary records external-only failure without recovery', () => {
  const base = fs.mkdtempSync(join(tmpdir(), 'rollback-https-'));
  try {
    fs.writeFileSync(
      join(base, 'curl'),
      '#!/usr/bin/env bash\nprintf "%s" "$MOCK_HTTP"\nexit "$MOCK_EXIT"\n',
      { mode: 0o755 },
    );
    for (const [http, exit] of [
      ['200', '0'],
      ['302', '0'],
      ['503', '22'],
    ]) {
      const env = {
        ...process.env,
        ...CONFIG,
        PATH: `${base}:${process.env.PATH}`,
        MOCK_HTTP: http,
        MOCK_EXIT: exit,
        GITHUB_STEP_SUMMARY: join(base, 'summary'),
        SSM_COMMAND_ID: COMMAND_ID,
        VALIDATION_RESULT: 'success',
        AUTH_RESULT: 'success',
        REMOTE_RESULT: 'success',
        HTTPS_RESULT: http === '200' ? 'success' : 'failure',
      };
      const result = spawnSync(
        'bash',
        ['-c', runBlock('Check external HTTPS readiness')],
        { env, encoding: 'utf8' },
      );
      assert.equal(result.status === 0, http === '200');
      fs.writeFileSync(env.GITHUB_STEP_SUMMARY, '');
      assert.equal(
        spawnSync('bash', ['-c', runBlock('Write rollback result')], {
          env,
          encoding: 'utf8',
        }).status,
        0,
      );
      const summary = read(env.GITHUB_STEP_SUMMARY);
      for (const value of [
        LAB_IMAGE,
        CONFIG.EC2_INSTANCE_ID,
        COMMAND_ID,
        http === '200' ? 'SUCCESS' : 'FAILED / INCOMPLETE',
      ])
        assert.ok(summary.includes(value));
      assert.doesNotMatch(
        runBlock('Check external HTTPS readiness'),
        /deploy-ssm|docker|aws ssm/,
      );
    }
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});
