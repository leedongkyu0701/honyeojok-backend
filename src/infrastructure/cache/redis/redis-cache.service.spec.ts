import { Logger } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

const redisMocks = vi.hoisted(() => ({ createClient: vi.fn() }));

vi.mock('redis', () => ({ createClient: redisMocks.createClient }));

describe('RedisCacheService', () => {
  beforeEach(() => {
    redisMocks.createClient.mockReset();
    vi.spyOn(Logger.prototype, 'debug').mockImplementation(() => undefined);
    vi.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    { enabled: false, url: 'redis://cache.example' },
    { enabled: true, url: undefined },
  ])(
    'does not create a client when Redis is disabled or unconfigured',
    async (config) => {
      const service = createService(config);

      await service.onModuleInit();

      expect(redisMocks.createClient).not.toHaveBeenCalled();
    },
  );

  it('connects a configured client with the bounded retry policy', async () => {
    const client = createClientMock();
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();

    await service.onModuleInit();

    expect(redisMocks.createClient).toHaveBeenCalledTimes(1);
    const options = redisMocks.createClient.mock.calls[0][0] as unknown;
    expect(options).toMatchObject({
      url: 'redis://cache.example',
      disableOfflineQueue: true,
      socket: { connectTimeout: 1_000 },
    });
    expect(client.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(client.on).toHaveBeenCalledWith('ready', expect.any(Function));
    expect(client.connect).toHaveBeenCalledTimes(1);
  });

  it('swallows initial connection failures and destroys an open client', async () => {
    const client = createClientMock({ isOpen: true });
    client.connect.mockRejectedValue(new Error('connection refused'));
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();

    await expect(service.onModuleInit()).resolves.toBeUndefined();

    expect(client.destroy).toHaveBeenCalledTimes(1);
  });

  it('returns null when the client is unavailable, on cache misses, and on GET failures', async () => {
    const unavailable = createService();
    await expect(unavailable.getJson('destinations')).resolves.toBeNull();

    const client = createClientMock({ isReady: true });
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();
    await service.onModuleInit();

    client.get
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('GET failed'));

    await expect(service.getJson('destinations')).resolves.toBeNull();
    await expect(service.getJson('destinations')).resolves.toBeNull();
  });

  it('parses valid cached JSON and falls back when cached JSON is invalid', async () => {
    const client = createClientMock({ isReady: true });
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();
    await service.onModuleInit();
    client.get
      .mockResolvedValueOnce('{"id":1,"name":"Seoul"}')
      .mockResolvedValueOnce('{invalid json');

    await expect(
      service.getJson<{ id: number; name: string }>('destination:1'),
    ).resolves.toEqual({
      id: 1,
      name: 'Seoul',
    });
    await expect(service.getJson('destination:1')).resolves.toBeNull();
  });

  it('serializes cache writes with the requested TTL and swallows Redis errors', async () => {
    const client = createClientMock({ isReady: true });
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();
    await service.onModuleInit();

    await service.setJson('destinations', { ids: [1, 2] }, 60);
    expect(client.set).toHaveBeenCalledWith('destinations', '{"ids":[1,2]}', {
      EX: 60,
    });

    client.set.mockRejectedValueOnce(new Error('SET failed'));
    await expect(
      service.setJson('destinations', { ids: [] }, 60),
    ).resolves.toBeUndefined();
  });

  it('does not write or delete while the client is not ready', async () => {
    const client = createClientMock({ isReady: false });
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();
    await service.onModuleInit();

    await service.setJson('key', { value: true }, 60);
    await service.delete('key');

    expect(client.set).not.toHaveBeenCalled();
    expect(client.del).not.toHaveBeenCalled();
  });

  it('deletes ready cache entries and treats delete failures as cache misses', async () => {
    const client = createClientMock({ isReady: true });
    redisMocks.createClient.mockReturnValue(client);
    const service = createService();
    await service.onModuleInit();

    await service.delete('destination:1');
    expect(client.del).toHaveBeenCalledWith('destination:1');

    client.del.mockRejectedValueOnce(new Error('DEL failed'));
    await expect(service.delete('destination:1')).resolves.toBeUndefined();
  });

  it('closes only open clients and swallows shutdown failures', async () => {
    const closedClient = createClientMock({ isOpen: false });
    redisMocks.createClient.mockReturnValueOnce(closedClient);
    const closedService = createService();
    await closedService.onModuleInit();
    await closedService.onApplicationShutdown();
    expect(closedClient.close).not.toHaveBeenCalled();

    const openClient = createClientMock({ isOpen: true });
    openClient.close.mockRejectedValue(new Error('close failed'));
    redisMocks.createClient.mockReturnValueOnce(openClient);
    const openService = createService();
    await openService.onModuleInit();

    await expect(openService.onApplicationShutdown()).resolves.toBeUndefined();
    expect(openClient.close).toHaveBeenCalledTimes(1);
  });
});

function createService(
  config: { enabled: boolean; url?: string } = {
    enabled: true,
    url: 'redis://cache.example',
  },
): RedisCacheService {
  return new RedisCacheService(config as never);
}

function createClientMock(
  state: { isOpen?: boolean; isReady?: boolean } = {},
): RedisClientMock {
  const client = {
    isOpen: state.isOpen ?? false,
    isReady: state.isReady ?? false,
    on: vi.fn(),
    connect: vi.fn(),
    destroy: vi.fn(),
    close: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
  };
  client.on.mockReturnValue(client);
  return client;
}

type RedisClientMock = {
  isOpen: boolean;
  isReady: boolean;
  on: ReturnType<typeof vi.fn>;
  connect: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
  set: ReturnType<typeof vi.fn>;
  del: ReturnType<typeof vi.fn>;
};
