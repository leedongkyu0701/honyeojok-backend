import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';

describe('HealthController', () => {
  let controller: HealthController;
  const database = {
    pingCheck: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue(database)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('keeps /health as a liveness alias without checking dependencies', async () => {
    await expect(controller.check()).resolves.toEqual({
      status: 'ok',
      info: {},
      error: {},
      details: {},
    });
    await expect(controller.live()).resolves.toEqual({
      status: 'ok',
      info: {},
      error: {},
      details: {},
    });
    expect(database.pingCheck).not.toHaveBeenCalled();
  });

  it('returns ready when PostgreSQL is healthy', async () => {
    database.pingCheck.mockResolvedValue({
      postgresql: { status: 'up' },
    });

    await expect(controller.ready()).resolves.toEqual({
      status: 'ok',
      info: { postgresql: { status: 'up' } },
      error: {},
      details: { postgresql: { status: 'up' } },
    });
    expect(database.pingCheck).toHaveBeenCalledWith('postgresql');
  });

  it('returns a 503 when PostgreSQL is unhealthy', async () => {
    database.pingCheck.mockResolvedValue({
      postgresql: { status: 'down', message: 'connection failed' },
    });

    try {
      await controller.ready();
      throw new Error('Expected readiness to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      const exception = error as HttpException;
      expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
      expect(exception.getResponse()).toMatchObject({
        status: 'error',
        error: {
          postgresql: { status: 'down', message: 'connection failed' },
        },
      });
    }
  });
});
