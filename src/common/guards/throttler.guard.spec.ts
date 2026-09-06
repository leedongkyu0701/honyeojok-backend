import type { Request } from 'express';
import { ThrottlerCustomGuard } from './throttler.guard';

class TestableThrottlerCustomGuard extends ThrottlerCustomGuard {
  getTrackerForTest(req: Request): Promise<string> {
    return this.getTracker(req);
  }
}

function request(ip: string, cfConnectingIp?: string): Request {
  return {
    ip,
    headers: cfConnectingIp ? { 'cf-connecting-ip': cfConnectingIp } : {},
  } as Request;
}

describe('ThrottlerCustomGuard', () => {
  const guard = Object.create(
    TestableThrottlerCustomGuard.prototype,
  ) as TestableThrottlerCustomGuard;

  it('uses CF-Connecting-IP as the tracker when present', async () => {
    await expect(
      guard.getTrackerForTest(request('10.0.0.1', '115.161.165.135')),
    ).resolves.toBe('ip-115.161.165.135');
  });

  it('falls back to req.ip when CF-Connecting-IP is absent', async () => {
    await expect(guard.getTrackerForTest(request('127.0.0.1'))).resolves.toBe(
      'ip-127.0.0.1',
    );
  });

  it('trims CF-Connecting-IP before using it as the tracker', async () => {
    await expect(
      guard.getTrackerForTest(request('10.0.0.1', ' 115.161.165.135 ')),
    ).resolves.toBe('ip-115.161.165.135');
  });
});
