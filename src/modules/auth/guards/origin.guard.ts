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

    throw BaseException.forbidden(
      'Missing origin/referer',
      ErrorCode.AUTH_FORBIDDEN,
    );
  }
}
