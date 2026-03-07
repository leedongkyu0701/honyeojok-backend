import type { JwtUser, UserRole } from 'src/types/user';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  // Reflector: 런타임에 데코레이터 메타데이터를 읽어오는 유틸리티 클래스

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // @Roles() 데코레이터가 없는 경우, 즉 권한 제한이 없는 경우는 통과(인증 성공이 아님)
    }

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as JwtUser | undefined;

    if (!user) {
      throw BaseException.forbidden(
        `인증되지 않은 사용자입니다.`,
        ErrorCode.AUTH_UNAUTHORIZED,
      );
    }

    if (!requiredRoles.includes(user.role)) {
      throw BaseException.forbidden(
        `권한이 없습니다.`,
        ErrorCode.AUTH_FORBIDDEN,
      );
    }

    return true;
  }
}
