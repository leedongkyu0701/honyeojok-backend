import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import type { MockedFunction } from 'vitest';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { authConfig } from 'src/config/auth.config';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

const oauthConfiguration = {
  jwt: {
    accessSecret: 'access-secret',
    refreshSecret: 'refresh-secret',
  },
  cookie: {
    secure: false,
    sameSite: 'lax' as const,
  },
  oauth: {
    requestTimeoutMs: 5_000,
    kakao: {
      clientId: 'kakao-client-id',
      clientSecret: 'kakao-client-secret',
      redirectUri: 'http://localhost:5001/auth/kakao/callback',
    },
    google: {
      clientId: 'google-client-id',
      clientSecret: 'google-client-secret',
      redirectUri: 'http://localhost:5001/auth/google/callback',
    },
    naver: {
      clientId: 'naver-client-id',
      clientSecret: 'naver-client-secret',
      redirectUri: 'http://localhost:5001/auth/naver/callback',
    },
  },
};

function jsonResponse(body: unknown, status = HttpStatus.OK): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function getOAuthFailure(
  promise: Promise<unknown>,
): Promise<BaseException> {
  try {
    await promise;
    throw new Error('Expected an OAuth failure');
  } catch (error) {
    expect(error).toBeInstanceOf(BaseException);
    return error as BaseException;
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let fetchMock: MockedFunction<typeof fetch>;
  let originalFetch: typeof fetch;

  beforeEach(async () => {
    oauthConfiguration.oauth.requestTimeoutMs = 5_000;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: authConfig.KEY, useValue: oauthConfiguration },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    originalFetch = global.fetch;
    fetchMock = vi.fn<typeof fetch>();
    global.fetch = fetchMock;
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('returns UserInfo after a successful timed request', async () => {
    const user = { id: 'google-user-id', email: 'user@example.com' };
    fetchMock.mockResolvedValueOnce(jsonResponse(user));

    await expect(service.googleUserInfo('access-token')).resolves.toEqual(user);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const requestInit = fetchMock.mock.calls[0]?.[1];
    expect(requestInit).toEqual(
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer access-token' },
      }),
    );
    expect(requestInit?.signal).toBeInstanceOf(AbortSignal);
  });

  it('returns a 504 OAuth failure after UserInfo requests time out', async () => {
    oauthConfiguration.oauth.requestTimeoutMs = 20;
    fetchMock.mockImplementation((_input, init) => {
      const signal = init?.signal;
      if (!signal) {
        return Promise.reject(new Error('Expected an abort signal'));
      }

      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener(
          'abort',
          () => reject(new Error('OAuth request aborted')),
          { once: true },
        );
      });
    });

    const exception = await getOAuthFailure(
      service.googleUserInfo('access-token'),
    );

    expect(exception.code).toBe(ErrorCode.OAUTH_FAILED);
    expect(exception.getStatus()).toBe(HttpStatus.GATEWAY_TIMEOUT);
    expect(exception.getResponse()).toMatchObject({
      details: { provider: 'google', step: 'user_info', reason: 'timeout' },
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retries a transient UserInfo 503 once before succeeding', async () => {
    const user = { id: 'google-user-id', email: 'user@example.com' };
    fetchMock
      .mockResolvedValueOnce(jsonResponse({}, HttpStatus.SERVICE_UNAVAILABLE))
      .mockResolvedValueOnce(jsonResponse(user));

    await expect(service.googleUserInfo('access-token')).resolves.toEqual(user);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not retry a permanent UserInfo 401 response', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, HttpStatus.UNAUTHORIZED));

    const exception = await getOAuthFailure(
      service.googleUserInfo('access-token'),
    );

    expect(exception.code).toBe(ErrorCode.OAUTH_FAILED);
    expect(exception.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
    expect(exception.getResponse()).toMatchObject({
      details: { provider: 'google', step: 'user_info', status: 401 },
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry a token exchange timeout', async () => {
    oauthConfiguration.oauth.requestTimeoutMs = 20;
    fetchMock.mockImplementation((_input, init) => {
      const signal = init?.signal;
      if (!signal) {
        return Promise.reject(new Error('Expected an abort signal'));
      }

      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener(
          'abort',
          () => reject(new Error('OAuth request aborted')),
          { once: true },
        );
      });
    });

    const exception = await getOAuthFailure(
      service.googleAccessToken('authorization-code'),
    );

    expect(exception.code).toBe(ErrorCode.OAUTH_FAILED);
    expect(exception.getStatus()).toBe(HttpStatus.GATEWAY_TIMEOUT);
    expect(exception.getResponse()).toMatchObject({
      details: { provider: 'google', step: 'token', reason: 'timeout' },
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not exceed the maximum UserInfo retry count', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({}, HttpStatus.SERVICE_UNAVAILABLE))
      .mockResolvedValueOnce(jsonResponse({}, HttpStatus.SERVICE_UNAVAILABLE));

    const exception = await getOAuthFailure(
      service.googleUserInfo('access-token'),
    );

    expect(exception.code).toBe(ErrorCode.OAUTH_FAILED);
    expect(exception.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
