import { registerAs } from '@nestjs/config';
import { getEnvironment } from './environment';

export const authConfig = registerAs('auth', () => {
  const env = getEnvironment();

  return {
    jwt: {
      accessSecret: env.JWT_ACCESS_SECRET_KEY,
      refreshSecret: env.JWT_REFRESH_SECRET_KEY,
    },
    cookie: {
      secure: env.COOKIE_SECURE,
      sameSite: env.COOKIE_SAMESITE,
    },
    oauth: {
      kakao: {
        clientId: env.KAKAO_CLIENT_ID,
        clientSecret: env.KAKAO_CLIENT_SECRET,
        redirectUri: env.KAKAO_REDIRECT_URI,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectUri: env.GOOGLE_REDIRECT_URI,
      },
      naver: {
        clientId: env.NAVER_CLIENT_ID,
        clientSecret: env.NAVER_CLIENT_SECRET,
        redirectUri: env.NAVER_REDIRECT_URI,
      },
    },
  };
});
