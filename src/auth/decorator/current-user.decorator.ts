import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../../types/user';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtUser | undefined => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.user as JwtUser | undefined;
  },
);
