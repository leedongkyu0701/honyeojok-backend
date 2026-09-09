import { PostgreSqlContainer } from '@testcontainers/postgresql';
import type { TestProject } from 'vitest/node';
import {
  createIntegrationDataSource,
  type IntegrationDatabaseConfig,
} from './helpers/integration-data-source';

export default async function setup(project: TestProject) {
  const container = await new PostgreSqlContainer('postgres:17')
    .withDatabase('honyeojok_integration')
    .withUsername('integration_user')
    .withPassword('integration_password')
    .start();
  const config: IntegrationDatabaseConfig = {
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    ssl: false,
  };
  const dataSource = createIntegrationDataSource(config);

  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    project.provide('integrationDatabase', config);
  } catch (error) {
    await container.stop();
    throw error;
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }

  return async () => {
    await container.stop();
  };
}
