import type { ConfigService } from '@nestjs/config';
import type { CookieOptions } from 'express';

export function getRefreshCookieOptions(config: ConfigService): CookieOptions {
  const nodeEnv = config.get<string>('NODE_ENV') ?? 'development';
  const cookieSameSite =
    (config.get<string>('COOKIE_SAMESITE') as 'lax' | 'none' | 'strict') ||
    'lax';
  const isProd = nodeEnv === 'production';

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: cookieSameSite,
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}
