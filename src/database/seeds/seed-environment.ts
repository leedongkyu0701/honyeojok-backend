export function assertLocalSeedEnvironment(
  appEnvironment: string | undefined,
): void {
  if (appEnvironment !== 'local') {
    throw new Error('Development seed can only run with APP_ENV=local');
  }
}

export function assertDeploySeedEnvironment(
  appEnvironment: string | undefined,
): void {
  if (appEnvironment !== 'staging' && appEnvironment !== 'production') {
    throw new Error(
      'Deploy seed can only run with APP_ENV=staging or production',
    );
  }
}
