import type { IntegrationDatabaseConfig } from './test-data-source';

declare module 'vitest' {
  export interface ProvidedContext {
    integrationDatabase: IntegrationDatabaseConfig;
    e2eDatabase: IntegrationDatabaseConfig;
  }
}
