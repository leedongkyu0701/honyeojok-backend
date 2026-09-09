import { ErrorCode } from 'src/common/exceptions/base.exception';
import { AuthCookieService } from '../auth-cookie.service';
import { AuthProvider } from '../enums/auth-provider.enum';
import { OAuthStateService } from './oauth-state.service';

describe('OAuthStateService', () => {
  let service: OAuthStateService;
  const authCookieService = {
    getOAuthStateCookieOptions: vi.fn(),
    getOAuthStateCookieClearOptions: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    authCookieService.getOAuthStateCookieOptions.mockReturnValue({
      httpOnly: true,
      path: '/auth',
      maxAge: 600_000,
    });
    authCookieService.getOAuthStateCookieClearOptions.mockReturnValue({
      httpOnly: true,
      path: '/auth',
    });
    service = new OAuthStateService(
      authCookieService as unknown as AuthCookieService,
    );
  });

  it('generates non-empty, independent state values', () => {
    const first = service.generate();
    const second = service.generate();

    expect(first).not.toBe('');
    expect(second).not.toBe('');
    expect(second).not.toBe(first);
  });

  it('stores each provider state under its dedicated protected cookie key', () => {
    const response = { cookie: vi.fn() };

    service.setCookie(response as never, AuthProvider.KAKAO, 'state-value');

    expect(response.cookie).toHaveBeenCalledWith(
      'oauth_state_kakao',
      'state-value',
      expect.objectContaining({
        httpOnly: true,
        path: '/auth',
        maxAge: 600_000,
      }),
    );
  });

  it.each([
    ['missing stored state', undefined, 'received-state'],
    ['missing received state', 'stored-state', undefined],
    ['mismatched state', 'stored-state', 'received-state'],
  ])(
    'clears the OAuth cookie and rejects a %s',
    (_label, storedState, receivedState) => {
      const response = { clearCookie: vi.fn() };
      let thrown: unknown;

      try {
        service.verifyOrThrow(
          {
            cookies: storedState ? { oauth_state_kakao: storedState } : {},
          } as never,
          response as never,
          AuthProvider.KAKAO,
          receivedState,
        );
      } catch (error) {
        thrown = error;
      }

      expect(thrown).toMatchObject({ code: ErrorCode.AUTH_UNAUTHORIZED });
      expect(response.clearCookie).toHaveBeenCalledWith('oauth_state_kakao', {
        httpOnly: true,
        path: '/auth',
      });
    },
  );

  it('clears a matching OAuth state after verification', () => {
    const response = { clearCookie: vi.fn() };

    expect(() =>
      service.verifyOrThrow(
        { cookies: { oauth_state_google: 'matching-state' } } as never,
        response as never,
        AuthProvider.GOOGLE,
        'matching-state',
      ),
    ).not.toThrow();
    expect(response.clearCookie).toHaveBeenCalledWith('oauth_state_google', {
      httpOnly: true,
      path: '/auth',
    });
  });
});
