import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../../types/user';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as JwtUser;
  },
);
