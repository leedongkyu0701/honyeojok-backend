// src/auth/cookies.ts
import type { ConfigService } from '@nestjs/config';
import type { CookieOptions } from 'express';

export function getRefreshCookieOptions(config: ConfigService): CookieOptions {
  const nodeEnv = config.get<string>('NODE_ENV') ?? 'development';
  const isProd = nodeEnv === 'production';

  // 운영 도메인 있으면 여기서 세팅 가능
  // const domain = config.get<string>("COOKIE_DOMAIN"); // 예: ".honyeo.com"

  return {
    httpOnly: true,
    secure: isProd, // 운영 HTTPS에서만 true
    sameSite: isProd ? 'none' : 'lax', // 진짜 배포때는 다시 lax로 바꾸기
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 필요하면
    // domain: isProd ? domain : undefined,
  };
}
