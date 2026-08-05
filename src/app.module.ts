import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsModule } from 'src/modules/destinations/destinations.module';
import { TripRoutesModule } from 'src/modules/trip-routes/trip-routes.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpotsModule } from 'src/modules/spots/spots.module';
import { PostsModule } from 'src/modules/posts/posts.module';
import { TagsModule } from 'src/modules/tags/tags.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerCustomGuard } from './common/guards/throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from 'src/modules/health/health.module';
import { DbShutdownService } from './database/db-shutdown.service';
import { LoggerModule } from 'nestjs-pino';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? undefined : '.env.development',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.APP_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  translateTime: 'SYS:standard',
                },
              },
        genReqId: (req: Request, res: Response) => {
          const headerRequestId =
            req.headers['x-request-id']?.toString() ||
            req.headers['x-correlation-id']?.toString();

          const id = headerRequestId || randomUUID();
          req.requestId = id;
          res.setHeader('x-request-id', id);
          return id;
        },

        customLogLevel: (_req, res, err) => {
          if (err || res.statusCode >= 500) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },

        autoLogging: {
          ignore: (req: Request) => {
            const ignoredPaths = ['/health', '/docs', '/favicon.ico'];
            return ignoredPaths.includes(req.path);
          },
        },
        redact: {
          // serialize 해서 필요 없지만 일단 놔둠.
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'res.headers[set-cookie]',
          ],
          censor: '[REDACTED]',
        },
        serializers:
          process.env.NODE_ENV === 'production'
            ? {
                req(req: Request) {
                  const url = new URL(req.originalUrl, 'http://dummy');

                  if (url.searchParams.has('code')) {
                    url.searchParams.set('code', '[REDACTED]');
                  }

                  if (url.searchParams.has('state')) {
                    url.searchParams.set('state', '[REDACTED]');
                  }

                  if (url.searchParams.has('token')) {
                    url.searchParams.set('token', '[REDACTED]');
                  }

                  return {
                    id: req.id,
                    method: req.method,
                    url: url.pathname + url.search,
                  };
                },
                res(res: Response) {
                  return {
                    statusCode: res.statusCode,
                  };
                },
              }
            : undefined,
      },
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
        autoLoadEntities: true,
        extra: {
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
        },
        // synchronize: true,
        // dropSchema: true,
      }),
    }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60,
        limit: 200,
      },
      {
        name: 'auth',
        ttl: 60,
        limit: 10,
      },
      {
        name: 'post',
        ttl: 10,
        limit: 10,
      },
    ]),
    DestinationsModule,
    TripRoutesModule,
    AuthModule,
    UsersModule,
    SpotsModule,
    PostsModule,
    TagsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerCustomGuard,
    },
    DbShutdownService,
  ],
})
export class AppModule {}
