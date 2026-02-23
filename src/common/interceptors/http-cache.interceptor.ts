import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

type CachePolicy = {
  maxAge: number; // browser seconds
  sMaxAge?: number; // CDN seconds
  swr?: number; // stale-while-revalidate seconds
};

function buildCacheControl(policy: CachePolicy): string {
  const maxAge = policy.maxAge ?? 0;
  const sMaxAge = policy.sMaxAge ?? 0;
  const swr = policy.swr ?? 0;

  const parts = [
    'public',
    `max-age=${maxAge}`,
    `s-maxage=${sMaxAge}`,
    `stale-while-revalidate=${swr}`,
  ];
  return parts.join(', ');
}

@Injectable()
export class HttpCacheInterceptor implements NestInterceptor {
  constructor(private readonly cachePolicy: CachePolicy) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    response.setHeader('Cache-Control', buildCacheControl(this.cachePolicy));

    return next.handle();
  }
}
