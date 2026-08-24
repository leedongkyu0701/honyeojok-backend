import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import type { Express } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { appConfig } from './config/app.config';
import type { ConfigType } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set('trust proxy', config.trustProxyHops);
  expressApp.disable('x-powered-by');
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

  app.enableCors({
    origin: config.corsOrigins,
    credentials: true,
  });

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

  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: config.swaggerEnabled ? false : undefined,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의된 속성만 허용하고, 그렇지 않은 속성은 자동으로 제거
      forbidNonWhitelisted: true, // dto에 정의되지 않은 속성이 요청에 포함된 경우 예외를 발생시킴
      transform: true, // 요청 데이터를 dto 클래스의 인스턴스로 자동 변환
    }),
  );
  await app.listen(config.port);
}
void bootstrap();
