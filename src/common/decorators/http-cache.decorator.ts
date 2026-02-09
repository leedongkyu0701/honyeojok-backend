import { UseInterceptors } from '@nestjs/common';
import { HttpCacheInterceptor } from '../interceptors/http-cache.interceptor';

export function HttpCache(policy: {
  maxAge: number;
  sMaxAge?: number;
  swr?: number;
}) {
  return UseInterceptors(new HttpCacheInterceptor(policy));
}
