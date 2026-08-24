import {
  databaseEnvSchema,
  envSchema,
  type DatabaseEnvironmentVariables,
  type EnvironmentVariables,
} from './env.schema';

let environment: EnvironmentVariables | undefined;
let databaseEnvironment: DatabaseEnvironmentVariables | undefined;

function formatEnvironmentIssues(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
): string {
  return issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
}

export function parseEnvironment(
  source: Record<string, unknown>,
): EnvironmentVariables {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const details = formatEnvironmentIssues(result.error.issues);
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

export function parseDatabaseEnvironment(
  source: Record<string, unknown>,
): DatabaseEnvironmentVariables {
  const result = databaseEnvSchema.safeParse(source);

  if (!result.success) {
    const details = formatEnvironmentIssues(result.error.issues);
    throw new Error(`Invalid database environment configuration: ${details}`);
  }

  return result.data;
}

/**
 * Use this only after the runtime has populated process.env (for example via
 * Node's --env-file option or a deployment platform's environment).
 */
export function getDatabaseEnvironment(): DatabaseEnvironmentVariables {
  databaseEnvironment ??= parseDatabaseEnvironment(process.env);
  return databaseEnvironment;
}
