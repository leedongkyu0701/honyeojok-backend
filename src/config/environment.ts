import { envSchema, type EnvironmentVariables } from './env.schema';

let environment: EnvironmentVariables | undefined;

export function parseEnvironment(
  source: Record<string, unknown>,
): EnvironmentVariables {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}

/**
 * Use this only after the runtime has populated process.env (for example via
 * Node/Nest's --env-file option or a deployment platform's environment).
 */
export function getEnvironment(): EnvironmentVariables {
  environment ??= parseEnvironment(process.env);
  return environment;
}
