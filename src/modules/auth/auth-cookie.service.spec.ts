import { AuthCookieService } from './auth-cookie.service';

describe('AuthCookieService', () => {
  it('applies the secure refresh-cookie policy for seven days', () => {
    const service = createService();

    expect(service.getRefreshCookieOptions()).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });

  it('uses a short-lived OAuth state cookie policy', () => {
    const service = createService();

    expect(service.getOAuthStateCookieOptions()).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth',
      maxAge: 10 * 60 * 1000,
    });
  });

  it('keeps clear-cookie options scoped to auth without a max age', () => {
    const service = createService();

    expect(service.getRefreshCookieClearOptions()).toEqual({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth',
    });
    expect(service.getOAuthStateCookieClearOptions()).not.toHaveProperty(
      'maxAge',
    );
  });
});

function createService(): AuthCookieService {
  return new AuthCookieService({
    cookie: { secure: true, sameSite: 'none' },
  } as never);
}
