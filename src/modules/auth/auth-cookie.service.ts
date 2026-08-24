import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import type { CookieOptions } from 'express';
import { authConfig } from 'src/config/auth.config';

const AUTH_COOKIE_PATH = '/auth';

@Injectable()
export class AuthCookieService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  getRefreshCookieOptions(): CookieOptions {
    return {
      ...this.getCommonOptions(),
      path: AUTH_COOKIE_PATH,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  getRefreshCookieClearOptions(): CookieOptions {
    return {
      ...this.getCommonOptions(),
      path: AUTH_COOKIE_PATH,
    };
  }

  getOAuthStateCookieOptions(): CookieOptions {
    return {
      ...this.getCommonOptions(),
      path: AUTH_COOKIE_PATH,
      maxAge: 10 * 60 * 1000,
    };
  }

  getOAuthStateCookieClearOptions(): CookieOptions {
    return {
      ...this.getCommonOptions(),
      path: AUTH_COOKIE_PATH,
    };
  }

  private getCommonOptions(): Pick<
    CookieOptions,
    'httpOnly' | 'secure' | 'sameSite'
  > {
    return {
      httpOnly: true,
      secure: this.config.cookie.secure,
      sameSite: this.config.cookie.sameSite,
    };
  }
}
