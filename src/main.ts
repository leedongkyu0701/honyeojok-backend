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
  expressApp.set('trust proxy', true); // 클라우드 환경에서 프록시 서버 뒤에 있을 때 클라이언트의 IP 주소를 올바르게 인식하도록 설정
  expressApp.disable('x-powered-by'); // 보안 강화: Express가 'X-Powered-By' 헤더를 보내지 않도록 설정
  app.enableShutdownHooks(); // 애플리케이션이 종료될 때 graceful shutdown을 지원하도록 설정

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
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
      whitelist: true, // dto에 정의된 속성만 허용하고, 그렇지 않은 속성은 자동으로 제거
      forbidNonWhitelisted: true, // dto에 정의되지 않은 속성이 요청에 포함된 경우 예외를 발생시킴
      transform: true, // 요청 데이터를 dto 클래스의 인스턴스로 자동 변환
    }),
  );
  await app.listen(process.env.PORT ?? 5001);
}
void bootstrap();
