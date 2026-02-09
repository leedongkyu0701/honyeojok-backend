import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import type { Express, NextFunction, Request, Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { GlobalExceptionFilter } from './common/exceptions/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set('trust proxy', 1); // trust first proxy
  expressApp.disable('x-powered-by');
  app.enableShutdownHooks();

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('Honyeo API')
      .setDescription('Honyeo(NestJS) API 문서입니다.')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'access-token',
      )
      .addCookieAuth('refreshToken', {
        name: 'refreshToken',
        type: 'apiKey',
        in: 'cookie',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Honyeo API Docs',
    });
  }

  const FRONTEND_ORIGIN =
    process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  app.enableCors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const incomingRequestId =
      req.header('x-request-id') ?? req.header('x-correlation-id');
    const requestId = incomingRequestId
      ? String(incomingRequestId)
      : randomUUID();

    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);

    next();
  });
  app.use(cookieParser());
  app.use(helmet({ contentSecurityPolicy: isProd ? undefined : false }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only allow properties that are in the DTO
      forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
      transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    }),
  );
  await app.listen(process.env.PORT ?? 5001);
}
void bootstrap();
