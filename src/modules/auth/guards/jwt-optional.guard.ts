import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt-access') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // context : 요청에 대한 정보 담긴 객체
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.header('authorization')) return true;

    try {
      const result = await super.canActivate(context);
      return !!result;
    } catch {
      return true; // 토큰 깨짐/만료 → 비회원처럼 통과
    }
  }
}
