// src/common/guards/origin.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class OriginGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const allowed = this.configService.getOrThrow<string>('FRONTEND_ORIGIN');
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // 브라우저 요청이 아니거나(서버-서버) origin이 없는 케이스도 있어서,
    // 실무에선 "origin 있으면 검사, 없으면 referer로 보조" 패턴을 많이 씀
    if (origin) {
      if (origin !== allowed) {
        throw BaseException.forbidden(
          `Invalid origin: ${origin}`,
          ErrorCode.AUTH_FORBIDDEN,
        );
      }
      return true;
    }

    if (referer) {
      if (!referer.startsWith(allowed)) {
        throw BaseException.forbidden(
          `Invalid referer: ${referer}`,
          ErrorCode.AUTH_FORBIDDEN,
        );
      }
      return true;
    }

    // origin/referer 둘 다 없으면:
    // - curl 같은 요청일 수 있음
    // - 운영 정책에 따라 허용/차단 결정
    // 보통 auth cookie 엔드포인트는 보수적으로 차단하는 편
    throw BaseException.forbidden(
      'Missing origin/referer',
      ErrorCode.AUTH_FORBIDDEN,
    );
  }
}
