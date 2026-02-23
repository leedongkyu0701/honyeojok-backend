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

    // const cf = req.headers['cf-connecting-ip'];
    // if (typeof cf === 'string' && cf.length > 0) {
    //   return Promise.resolve(`ip-${cf.trim()}`);
    // } // Cloudflare을 사용하는 경우, cf-connecting-ip 헤더를 우선적으로 사용하여 실제 클라이언트 IP를 추적

    // const xff = req.headers['x-forwarded-for'];
    // if (xff && typeof xff === 'string') {
    //   console.log('ip=', req.ip, 'xff=', req.headers['x-forwarded-for']);
    //   return Promise.resolve(`ip-${xff.split(',')[0].trim()}`);
    // }

    // console.log('ip=', req.ip);
    return Promise.resolve(`ip-${req.ip}`);
  }
}
