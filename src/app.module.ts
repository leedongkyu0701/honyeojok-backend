import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsModule } from './destinations/destinations.module';
import { TripRoutesModule } from './trip-routes/trip-routes.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpotModule } from './spots/spot.module';
import { PostModule } from './posts/post.module';
import { TagsModule } from './tags/tags.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerCustomGuard } from './common/guards/throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { DbShutdownService } from './common/db-shutdown.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? undefined : '.env.development',
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
    UserModule,
    SpotModule,
    PostModule,
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
