import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import type { IntegrationDatabaseConfig } from './test-data-source';

export async function startPostgresTestContainer(): Promise<StartedPostgreSqlContainer> {
  return new PostgreSqlContainer('postgres:17')
    .withDatabase('honyeojok_test')
    .withUsername('test_user')
    .withPassword('test_password')
    .start();
}

export function getTestDatabaseConfig(
  container: StartedPostgreSqlContainer,
): IntegrationDatabaseConfig {
  return {
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    ssl: false,
  };
}
