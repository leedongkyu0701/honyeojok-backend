import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsModule } from 'src/modules/destinations/destinations.module';
import { TripRoutesModule } from 'src/modules/trip-routes/trip-routes.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule, type ConfigType } from '@nestjs/config';
import { SpotsModule } from 'src/modules/spots/spots.module';
import { PostsModule } from 'src/modules/posts/posts.module';
import { TagsModule } from 'src/modules/tags/tags.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerCustomGuard } from './common/guards/throttler.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HealthModule } from 'src/modules/health/health.module';
import { DbShutdownService } from './database/db-shutdown.service';
import { LoggerModule } from 'nestjs-pino';
import { appConfig } from './config/app.config';
import {
  createNestDatabaseOptions,
  databaseConfig,
} from './config/database.config';
import { authConfig } from './config/auth.config';
import { storageConfig } from './config/storage.config';
import { observabilityConfig } from './config/observability.config';
import { createPinoHttpOptions, loggerConfig } from './config/logger.config';
import { parseEnvironment } from './config/environment';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      cache: true,
      validate: parseEnvironment,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        storageConfig,
        observabilityConfig,
        loggerConfig,
      ],
    }),
    LoggerModule.forRootAsync({
      inject: [loggerConfig.KEY],
      useFactory: (config: ConfigType<typeof loggerConfig>) => ({
        pinoHttp: createPinoHttpOptions(config),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) =>
        createNestDatabaseOptions(config),
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
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    DbShutdownService,
  ],
})
export class AppModule {}
