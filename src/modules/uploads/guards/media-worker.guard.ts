import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';
import type { Request } from 'express';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { storageConfig } from 'src/config/storage.config';

@Injectable()
export class MediaWorkerGuard implements CanActivate {
  constructor(
    @Inject(storageConfig.KEY)
    private readonly config: ConfigType<typeof storageConfig>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const expected = this.config.mediaWorkerSecret;
    const authorization = request.header('authorization') ?? '';
    const expectedAuthorization = expected ? `Bearer ${expected}` : '';
    const actualBuffer = Buffer.from(authorization);
    const expectedBuffer = Buffer.from(expectedAuthorization);

    if (
      !expected ||
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      throw BaseException.unauthorized(
        'Invalid media worker credentials',
        ErrorCode.AUTH_UNAUTHORIZED,
      );
    }

    return true;
  }
}
