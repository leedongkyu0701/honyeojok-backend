import {
  assertDeploySeedEnvironment,
  assertLocalSeedEnvironment,
} from './seed-environment';

describe('seed environment guards', () => {
  it('allows the local seed only with APP_ENV=local', () => {
    expect(() => assertLocalSeedEnvironment('local')).not.toThrow();
    expect(() => assertLocalSeedEnvironment('staging')).toThrow(
      'Development seed can only run with APP_ENV=local',
    );
  });

  it.each(['staging', 'production'])(
    'allows deploy seed with APP_ENV=%s',
    (appEnvironment) => {
      expect(() => assertDeploySeedEnvironment(appEnvironment)).not.toThrow();
    },
  );

  it.each(['local', 'development', 'test', undefined])(
    'rejects deploy seed with APP_ENV=%s',
    (appEnvironment) => {
      expect(() => assertDeploySeedEnvironment(appEnvironment)).toThrow(
        'Deploy seed can only run with APP_ENV=staging or production',
      );
    },
  );
});
