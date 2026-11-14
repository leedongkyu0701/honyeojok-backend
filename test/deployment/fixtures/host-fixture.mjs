import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as ssm from '../../../scripts/deploy-ssm.mjs';

export const LAB_IMAGE =
  '939898395322.dkr.ecr.ap-northeast-2.amazonaws.com/honyeojok-backend-lab@sha256:' +
  'b'.repeat(64);
const IMAGE =
  '123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/backend@sha256:' +
  'b'.repeat(64);
const CONFIG = { AWS_REGION: 'ap-northeast-2' };
const hash = (contents) => createHash('sha256').update(contents).digest('hex');
const read = (path) => fs.readFileSync(path, 'utf8');
const realFlock =
  spawnSync('sh', ['-c', 'command -v flock'], { encoding: 'utf8' }).status ===
  0;

export function fixture(
  mode,
  { operation = 'deploy', oldState, oldReady } = {},
) {
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
    JSON.stringify({ mode, runtime: 'old', operation, oldState, oldReady }),
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
    join(ssm.ROOT, `scripts/${overrides.operation || operation}-ec2.sh`),
    app,
    overrides.image || (operation === 'rollback' ? LAB_IMAGE : IMAGE),
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

export async function scenario(mode, check, options) {
  const f = fixture(mode, options);
  try {
    return await check(f);
  } finally {
    f.cleanup();
  }
}
