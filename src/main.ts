import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { appConfig } from './config/app.config';
import type { ConfigType } from '@nestjs/config';
import { configureHttpApplication } from './bootstrap/configure-http-application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(Logger);
  app.useLogger(logger);
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.enableShutdownHooks();

  if (config.swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('HonyeoJok API')
      .setDescription('HonyeoJok`(NestJS) API 문서입니다.')
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
      customSiteTitle: 'HonyeoJok API Docs',
    });
  }

  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   const incomingRequestId =
  //     req.header('x-request-id') ?? req.header('x-correlation-id');
  //   const requestId = incomingRequestId
  //     ? String(incomingRequestId)
  //     : randomUUID();

  //   req.requestId = requestId;
  //   res.setHeader('x-request-id', requestId);

  //   next();
  // }); pino의 genReqId 옵션으로 대체

  configureHttpApplication(app, config);
  await app.listen(config.port);
}
void bootstrap();
