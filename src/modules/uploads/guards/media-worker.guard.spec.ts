import type { ExecutionContext } from '@nestjs/common';
import { storageConfig } from 'src/config/storage.config';
import { MediaWorkerGuard } from './media-worker.guard';

describe('MediaWorkerGuard', () => {
  const createContext = (authorization?: string) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          header: (name: string) =>
            name === 'authorization' ? authorization : undefined,
        }),
      }),
    }) as unknown as ExecutionContext;

  it('rejects a request without the worker secret', () => {
    const guard = new MediaWorkerGuard({
      [storageConfig.KEY]: undefined,
      imageUploadEnabled: true,
      mediaWorkerSecret: 'worker-secret',
    } as never);

    expect(() => guard.canActivate(createContext())).toThrow(
      'Invalid media worker credentials',
    );
  });

  it('accepts the exact bearer worker secret', () => {
    const guard = new MediaWorkerGuard({
      imageUploadEnabled: true,
      mediaWorkerSecret: 'worker-secret',
    } as never);

    expect(guard.canActivate(createContext('Bearer worker-secret'))).toBe(true);
  });
});
