import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import request from 'supertest';
import { App } from 'supertest/types';
import { ThrottlerCustomGuard } from 'src/common/guards/throttler.guard';
import { HealthModule } from 'src/modules/health/health.module';

function isHealthResponse(
  value: unknown,
): value is { status: 'ok'; timestamp: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    value.status === 'ok' &&
    'timestamp' in value &&
    typeof value.timestamp === 'string'
  );
}

describe('Health endpoint (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HealthModule,
        ThrottlerModule.forRoot([
          {
            name: 'default',
            ttl: seconds(60),
            limit: 1,
          },
        ]),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerCustomGuard,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    const body: unknown = response.body;
    expect(isHealthResponse(body)).toBe(true);

    if (!isHealthResponse(body)) return;

    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });

  it('/health is excluded from global throttling', async () => {
    await request(app.getHttpServer()).get('/health').expect(200);
    await request(app.getHttpServer()).get('/health').expect(200);
  });
});
