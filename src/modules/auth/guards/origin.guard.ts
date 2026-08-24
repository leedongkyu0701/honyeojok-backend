import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import type { ConfigType } from '@nestjs/config';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { appConfig } from 'src/config/app.config';

@Injectable()
export class OriginGuard implements CanActivate {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const origin = req.headers.origin;
    const referer = req.headers.referer;

    if (origin) {
      if (!this.config.corsOrigins.includes(origin)) {
        throw BaseException.forbidden(
          `Invalid origin: ${origin}`,
          ErrorCode.AUTH_FORBIDDEN,
        );
      }
      return true;
    }

    if (referer) {
      let refererOrigin: string;

      try {
        refererOrigin = new URL(referer).origin;
      } catch {
        throw BaseException.forbidden(
          `Invalid referer: ${referer}`,
          ErrorCode.AUTH_FORBIDDEN,
        );
      }

      if (!this.config.corsOrigins.includes(refererOrigin)) {
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
