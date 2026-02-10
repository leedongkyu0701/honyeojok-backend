import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import { AuthProvider } from 'src/types/user';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

const STATE_TTL_MS = 10 * 60 * 1000; // 10분
const COOKIE_PATH = '/auth';
const COOKIE_SAMESITE =
  (process.env.COOKIE_SAMESITE as 'lax' | 'none' | 'strict') || 'lax'; // 기본값은 lax

interface CookieRequest extends Request {
  cookies: { [key: string]: string };
}

function cookieKey(provider: AuthProvider) {
  return `oauth_state_${provider}`;
}

/** ✅ CSPRNG 기반 state 생성 (실무 기준) */
export function generateOAuthState(): string {
  return randomBytes(32).toString('base64url');
}

/** ✅ authorize 단계: state를 httpOnly 쿠키에 저장 */
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

/** ✅ callback 단계: query.state vs cookie 비교, 성공 시 1회성 삭제 */
export function verifyOAuthStateOrThrow(
  req: CookieRequest,
  res: Response,
  provider: AuthProvider,
  receivedState: string | undefined,
) {
  const key = cookieKey(provider);
  const storedState = req.cookies?.[key];

  if (!storedState || !receivedState || storedState !== receivedState) {
    // 실패해도 쿠키는 지워서 재시도 깔끔하게
    res.clearCookie(key, { path: COOKIE_PATH });
    throw BaseException.unauthorized(
      'Invalid OAuth state',
      ErrorCode.AUTH_UNAUTHORIZED,
    );
  }

  // ✅ 1회성 소비
  res.clearCookie(key, { path: COOKIE_PATH });
}
