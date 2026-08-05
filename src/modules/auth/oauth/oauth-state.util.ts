import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

const STATE_TTL_MS = 10 * 60 * 1000;
const COOKIE_PATH = '/auth';
const COOKIE_SAMESITE =
  (process.env.COOKIE_SAMESITE as 'lax' | 'none' | 'strict') || 'lax';

interface CookieRequest extends Request {
  cookies: { [key: string]: string };
}

function cookieKey(provider: AuthProvider) {
  return `oauth_state_${provider}`;
}

export function generateOAuthState(): string {
  return randomBytes(32).toString('base64url');
}

export function setOAuthStateCookie(
  res: Response,
  provider: AuthProvider,
  state: string,
) {
  res.cookie(cookieKey(provider), state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: COOKIE_SAMESITE,
    maxAge: STATE_TTL_MS,
    path: COOKIE_PATH,
  });
}

export function verifyOAuthStateOrThrow(
  req: CookieRequest,
  res: Response,
  provider: AuthProvider,
  receivedState: string | undefined,
) {
  const key = cookieKey(provider);
  const storedState = req.cookies?.[key];

  if (!storedState || !receivedState || storedState !== receivedState) {
    res.clearCookie(key, { path: COOKIE_PATH });
    throw BaseException.unauthorized(
      'Invalid OAuth state',
      ErrorCode.AUTH_UNAUTHORIZED,
    );
  }

  res.clearCookie(key, { path: COOKIE_PATH });
}
