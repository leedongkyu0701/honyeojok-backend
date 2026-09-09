import type { TestDatabaseConfig } from './test-data-source';

declare module 'vitest' {
  export interface ProvidedContext {
    integrationDatabase: TestDatabaseConfig;
    e2eDatabase: TestDatabaseConfig;
  }
}
