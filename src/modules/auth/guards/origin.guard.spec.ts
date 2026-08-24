import type { ExecutionContext } from '@nestjs/common';
import { BaseException } from 'src/common/exceptions/base.exception';
import { OriginGuard } from './origin.guard';

function createContext(headers: Record<string, string>): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
    }),
  } as unknown as ExecutionContext;
}

describe('OriginGuard', () => {
  const guard = new OriginGuard({
    corsOrigins: ['https://www.honyeojok.com', 'https://honyeojok.com'],
  } as ConstructorParameters<typeof OriginGuard>[0]);

  it('allows an exact configured Origin', () => {
    expect(
      guard.canActivate(createContext({ origin: 'https://www.honyeojok.com' })),
    ).toBe(true);
  });

  it('rejects an unconfigured Origin', () => {
    expect(() =>
      guard.canActivate(createContext({ origin: 'https://evil.example' })),
    ).toThrow(BaseException);
  });

  it('allows a Referer whose parsed origin is configured', () => {
    expect(
      guard.canActivate(
        createContext({ referer: 'https://honyeojok.com/auth/callback?x=1' }),
      ),
    ).toBe(true);
  });

  it('rejects a malformed Referer', () => {
    expect(() =>
      guard.canActivate(createContext({ referer: 'not a url' })),
    ).toThrow(BaseException);
  });

  it('rejects a prefix-matching Referer attack', () => {
    expect(() =>
      guard.canActivate(
        createContext({ referer: 'https://honyeojok.com.evil.example/path' }),
      ),
    ).toThrow(BaseException);
  });
});
