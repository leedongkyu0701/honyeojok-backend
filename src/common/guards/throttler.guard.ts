import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';
import { JwtUser } from 'src/types/user';

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    const user = req?.user as JwtUser | undefined;
    if (user && user.id) {
      return Promise.resolve(`user-${user.id}`);
    }

    const cf = req.headers['cf-connecting-ip'];
    if (typeof cf === 'string' && cf.length > 0) {
      return Promise.resolve(`ip-${cf.trim()}`);
    }

    const xff = req.headers['x-forwarded-for'];
    if (xff && typeof xff === 'string') {
      return Promise.resolve(`ip-${xff.split(',')[0].trim()}`);
    }

    return Promise.resolve(`ip-${req.ip}`);
  }
}
