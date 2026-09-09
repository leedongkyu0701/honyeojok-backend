import type { INestApplication } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import type { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { configureHttpApplication } from 'src/bootstrap/configure-http-application';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/modules/auth/auth.service';
import { appConfig } from 'src/config/app.config';
import type { IntegrationDatabaseConfig } from '../database/test-data-source';
import { applyE2eTestEnvironment } from './test-environment';

export type E2eApplication = {
  app: INestApplication<App>;
  authService: AuthService;
  dataSource: DataSource;
};

export async function createE2eApplication(
  database: IntegrationDatabaseConfig,
): Promise<E2eApplication> {
  applyE2eTestEnvironment(database);

  // Config factories resolve process.env only while Nest creates the module.
  // The deterministic environment above is therefore in place before parsing.
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = testingModule.createNestApplication<INestApplication<App>>();
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  configureHttpApplication(app, config);
  await app.init();

  return {
    app,
    authService: app.get<AuthService>(AuthService),
    dataSource: app.get<DataSource>(DataSource),
  };
}
