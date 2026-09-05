import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { createClient } from 'redis';
import { redisConfig } from 'src/config/redis.config';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class RedisCacheService implements OnModuleInit, OnApplicationShutdown {
  private client?: RedisClient;
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(
    @Inject(redisConfig.KEY)
    private readonly config: ConfigType<typeof redisConfig>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.config.enabled || !this.config.url) {
      this.logger.debug(
        'Redis cache is disabled because REDIS_URL is not set.',
      );
      return;
    }

    const client = createClient({
      url: this.config.url,
      disableOfflineQueue: true,
      socket: {
        connectTimeout: 1_000,
        reconnectStrategy: (retries) => (retries < 2 ? 200 : false),
      },
    });

    client.on('error', () => {
      this.logger.warn(
        'Redis cache client error; cache operations will use the database fallback.',
      );
    });
    client.on('ready', () => {
      this.logger.log('Redis cache connected.');
    });

    this.client = client;

    try {
      await client.connect();
    } catch {
      this.logger.warn(
        'Redis cache is unavailable at startup; requests will use the database fallback.',
      );

      if (client.isOpen) {
        client.destroy();
      }
    }
  }

  async onApplicationShutdown(): Promise<void> {
    const client = this.client;

    if (!client?.isOpen) {
      return;
    }

    try {
      await client.close();
    } catch {
      this.logger.warn('Failed to close the Redis cache connection.');
    }
  }

  async getJson<T>(key: string): Promise<T | null> {
    const client = this.getReadyClient();

    if (!client) {
      return null;
    }

    try {
      const value = await client.get(key);
      return value === null ? null : (JSON.parse(value) as T);
    } catch {
      this.logger.warn('Redis cache GET failed; using the database fallback.');
      return null;
    }
  }

  async setJson(
    key: string,
    value: unknown,
    ttlSeconds: number,
  ): Promise<void> {
    const client = this.getReadyClient();

    if (!client) {
      return;
    }

    try {
      await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
    } catch {
      this.logger.warn(
        'Redis cache SET failed; returning the database result.',
      );
    }
  }

  async delete(key: string): Promise<void> {
    const client = this.getReadyClient();

    if (!client) {
      return;
    }

    try {
      await client.del(key);
    } catch {
      this.logger.warn(
        'Redis cache DELETE failed; stale data will expire by its TTL.',
      );
    }
  }

  private getReadyClient(): RedisClient | undefined {
    return this.client?.isReady ? this.client : undefined;
  }
}
