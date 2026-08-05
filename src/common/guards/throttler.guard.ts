import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';
// import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    // const user = req?.user as JwtUser | undefined;
    // if (user && user.id) {
    //   return Promise.resolve(`user-${user.id}`);
    // }
    // 전역 throttler guard가 AuthGuard보다 먼저 실행되도록 설정되어 있기 때문에, req.user는 아직 할당되지 않은 상태입니다. 따라서 IP 주소를 기반으로 트래킹하는 방식으로 구현 바꿈

    // const cf = req.headers['cf-connecting-ip'];
    // if (typeof cf === 'string' && cf.length > 0) {
    //   return Promise.resolve(`ip-${cf.trim()}`);
    // } // Cloudflare을 사용하는 경우, cf-connecting-ip 헤더를 우선적으로 사용하여 실제 클라이언트 IP를 추적

    // const xff = req.headers['x-forwarded-for'];
    // if (xff && typeof xff === 'string') {
    //   return Promise.resolve(`ip-${xff.split(',')[0].trim()}`);
    // }

    return Promise.resolve(`ip-${req.ip}`);
  }
}
