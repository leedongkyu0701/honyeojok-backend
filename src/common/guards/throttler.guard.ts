import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';
// import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    // Render public traffic passes through Cloudflare. Use CF-Connecting-IP for
    // rate-limit tracking, with req.ip as a fallback for local/non-Render use.
    const cfConnectingIp = req.headers['cf-connecting-ip'];

    if (
      typeof cfConnectingIp === 'string' &&
      cfConnectingIp.trim().length > 0
    ) {
      return Promise.resolve(`ip-${cfConnectingIp.trim()}`);
    }

    return Promise.resolve(`ip-${req.ip}`);
  }
}
