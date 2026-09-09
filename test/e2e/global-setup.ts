import type { TestProject } from 'vitest/node';
import { createTestDataSource } from '../support/database/test-data-source';
import {
  getTestDatabaseConfig,
  startPostgresTestContainer,
} from '../support/database/postgres-container';

export default async function setup(project: TestProject) {
  const container = await startPostgresTestContainer();
  const config = getTestDatabaseConfig(container);
  const dataSource = createTestDataSource(config);

  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    project.provide('e2eDatabase', config);
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
