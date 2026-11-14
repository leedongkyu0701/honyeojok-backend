// Executed only through temporary command wrappers in deployment tests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { setTimeout: delay } = require('node:timers/promises');

async function main() {
  const base = path.dirname(path.dirname(process.argv[1]));
  const statePath = path.join(base, 'state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const mode = state.mode;
  const name = path.basename(process.argv[1]);
  const args = process.argv.slice(2);
  fs.appendFileSync(
    path.join(base, 'events'),
    JSON.stringify([name, args, state.runtime]) + '\n',
  );
  const fail = () => {
    console.error(`mock failure: ${name}`);
    process.exit(7);
  };
  const save = () => fs.writeFileSync(statePath, JSON.stringify(state));
  if (name === 'id') {
    console.log(mode === 'wrong_user' ? 'root' : 'ubuntu');
  } else if (name === 'sha256sum') {
    console.log(
      createHash('sha256').update(fs.readFileSync(args[0])).digest('hex') +
        '  ' +
        args[0],
    );
  } else if (name === 'flock') {
    // macOS lacks util-linux flock. CI uses the real Linux flock; locally this
    // model checks fd 9 and enforces exclusion for the lifetime of the Bash PID.
    assert.deepEqual(args, ['-n', '9']);
    const lock = fs.statSync(
      path.join(base, "app with 'quote", '.deploy/deploy.lock'),
    );
    assert.equal(fs.fstatSync(9).ino, lock.ino);
    const lease = path.join(base, 'lock-owner');
    if (fs.existsSync(lease)) {
      try {
        process.kill(Number(fs.readFileSync(lease, 'utf8')), 0);
        process.exit(1);
      } catch (error) {
        if (error.code !== 'ESRCH') throw error;
      }
      fs.unlinkSync(lease);
    }
    fs.writeFileSync(lease, String(process.ppid), { flag: 'wx' });
  } else if (name === 'aws') {
    for (const key of [
      'AWS_ACCESS_KEY_ID',
      'AWS_PROFILE',
      'AWS_WEB_IDENTITY_TOKEN_FILE',
    ]) {
      assert.equal(process.env[key], undefined);
    }
    assert.equal(process.env.AWS_SHARED_CREDENTIALS_FILE, '/dev/null');
    assert.equal(process.env.AWS_CONFIG_FILE, '/dev/null');
    assert.equal(process.env.AWS_EC2_METADATA_DISABLED, 'false');
    if (mode === 'login') fail();
    console.log('MOCK_AUTH_TOKEN');
  } else if (name === 'curl') {
    if (
      ((mode === 'old_ready' || state.oldReady === false) &&
        state.runtime === 'old') ||
      ([
        'ready',
        'rollback_up',
        'rollback_health',
        'rollback_image',
        'rollback_ready',
        'slow_rollback',
      ].includes(mode) &&
        state.runtime === 'new') ||
      (mode === 'rollback_ready' && state.runtime === 'rollback')
    )
      fail();
    if (args.includes('--write-out'))
      process.stdout.write(
        mode === 'redirect' && state.runtime === 'new' ? '302' : '200',
      );
  } else if (name === 'mv') {
    if (
      mode === 'record' &&
      args.at(-1) === '.deploy/current-image' &&
      state.runtime === 'new'
    )
      fail();
    fs.renameSync(args.at(-2), args.at(-1));
  } else if (name === 'docker') {
    if (args[0] === 'login') {
      if (fs.readFileSync(0, 'utf8').trim() !== 'MOCK_AUTH_TOKEN') fail();
    } else if (args[0] === 'image' && args[1] === 'tag') {
      if (mode === 'tag') fail();
      assert.equal(args[2], 'sha256:' + 'a'.repeat(64));
      state.rollbackTag = args[3];
      save();
    } else if (args[0] === 'image' && args[1] === 'inspect') {
      if (mode === 'image_lookup') fail();
      console.log('sha256:' + 'b'.repeat(64));
    } else if (args[0] === 'inspect') {
      if (args[2].includes('.Image')) {
        const wrong =
          (mode === 'image' && state.runtime === 'new') ||
          (mode === 'rollback_image' && state.runtime === 'rollback');
        console.log(
          'sha256:' +
            (wrong ? 'c' : state.runtime === 'new' ? 'b' : 'a').repeat(64),
        );
      } else {
        const unhealthy =
          (mode === 'old_health' && state.runtime === 'old') ||
          (mode === 'health' && state.runtime === 'new') ||
          (mode === 'redis' && args.at(-1) === 'redis-id') ||
          (mode === 'rollback_health' && state.runtime === 'rollback');
        console.log(
          state.runtime === 'old' && state.oldState
            ? state.oldState
            : unhealthy
              ? 'running/unhealthy'
              : 'running/healthy',
        );
      }
    } else if (args[0] === 'compose') {
      assert.deepEqual(args.slice(1, 7), [
        '--env-file',
        '.env.local',
        '-p',
        'honyeojok-backend',
        '-f',
        'compose.ec2.yaml',
      ]);
      const op = args[7];
      if (op === 'ps') {
        if (
          !(
            mode === 'missing_app' &&
            state.runtime === 'old' &&
            args.at(-1) === 'app'
          )
        )
          console.log(
            args.at(-1) === 'redis' ? 'redis-id' : 'app-' + state.runtime,
          );
      } else if (op === 'pull') {
        assert.deepEqual(
          args.slice(8),
          state.operation === 'rollback' ? ['app'] : ['app', 'migrate'],
        );
        if (mode === 'pull') fail();
      } else if (op === 'run') {
        assert.notEqual(
          state.operation,
          'rollback',
          'Manual rollback must never run migrations',
        );
        assert.equal(state.runtime, 'old');
        assert.equal(args.at(-1), 'migrate');
        assert.ok(args.includes('--no-deps') && args.includes('--pull'));
        assert.equal(fs.readFileSync(0, 'utf8'), '');
        if (mode === 'migration') fail();
      } else if (op === 'up') {
        assert.equal(args.at(-1), 'app');
        assert.ok(
          ['--no-deps', 'never', '--wait'].every((arg) => args.includes(arg)),
        );
        const rollback = process.env.APP_IMAGE.startsWith(
          'honyeojok-backend-rollback:',
        );
        state.runtime = rollback ? 'rollback' : 'new';
        save();
        if (rollback && mode === 'slow_rollback') {
          fs.writeFileSync(path.join(base, 'recovering'), '');
          await delay(1000);
        }
        if (
          (mode === 'up' && !rollback) ||
          (mode === 'rollback_up' && rollback)
        )
          fail();
      } else {
        throw new Error(`Unexpected Compose operation: ${op}`);
      }
    } else {
      throw new Error(`Unexpected Docker command: ${args}`);
    }
  } else {
    throw new Error(`Unexpected mock command: ${name}`);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
