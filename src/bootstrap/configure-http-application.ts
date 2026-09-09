import { ValidationPipe, type INestApplication } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import helmet from 'helmet';
import { appConfig } from 'src/config/app.config';

/**
 * Applies the HTTP request pipeline shared by the production server and E2E
 * applications. Lifecycle concerns such as logging, Swagger and listening are
 * intentionally left to the caller.
 */
export function configureHttpApplication(
  app: INestApplication,
  config: ConfigType<typeof appConfig>,
): void {
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set('trust proxy', config.trustProxy);
  expressApp.disable('x-powered-by');

  app.enableCors({
    origin: config.corsOrigins,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: config.swaggerEnabled ? false : undefined,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
