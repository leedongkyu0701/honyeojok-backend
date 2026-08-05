import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtUser | undefined => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.user as JwtUser | undefined;
  },
);
