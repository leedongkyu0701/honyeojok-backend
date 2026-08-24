import { randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { AuthCookieService } from '../auth-cookie.service';
import { AuthProvider } from '../enums/auth-provider.enum';

interface CookieRequest extends Request {
  cookies: Record<string, string>;
}

@Injectable()
export class OAuthStateService {
  constructor(private readonly authCookieService: AuthCookieService) {}

  generate(): string {
    return randomBytes(32).toString('base64url');
  }

  setCookie(res: Response, provider: AuthProvider, state: string): void {
    res.cookie(this.getCookieKey(provider), state, {
      ...this.authCookieService.getOAuthStateCookieOptions(),
    });
  }

  verifyOrThrow(
    req: CookieRequest,
    res: Response,
    provider: AuthProvider,
    receivedState: string | undefined,
  ): void {
    const key = this.getCookieKey(provider);
    const storedState = req.cookies?.[key];
    const clearOptions =
      this.authCookieService.getOAuthStateCookieClearOptions();

    if (!storedState || !receivedState || storedState !== receivedState) {
      res.clearCookie(key, clearOptions);
      throw BaseException.unauthorized(
        'Invalid OAuth state',
        ErrorCode.AUTH_UNAUTHORIZED,
      );
    }

    res.clearCookie(key, clearOptions);
  }

  private getCookieKey(provider: AuthProvider): string {
    return `oauth_state_${provider}`;
  }
}
