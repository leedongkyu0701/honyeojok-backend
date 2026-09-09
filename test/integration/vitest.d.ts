import type { IntegrationDatabaseConfig } from './helpers/integration-data-source';

declare module 'vitest' {
  export interface ProvidedContext {
    integrationDatabase: IntegrationDatabaseConfig;
  }
}
