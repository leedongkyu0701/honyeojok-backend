import request from 'supertest';
import { User } from 'src/modules/users/entities/user.entity';
import { inject } from 'vitest';
import {
  createE2eApplication,
  type E2eApplication,
} from '../support/e2e/create-e2e-app';
import { createAuthenticatedUser } from '../support/e2e/authenticated-user';
import { TEST_FRONTEND_ORIGIN } from '../support/e2e/test-environment';
import { resetDatabase } from '../support/database/reset-database';

describe('Authentication flows (e2e)', () => {
  let e2e: E2eApplication;

  beforeAll(async () => {
    e2e = await createE2eApplication(inject('e2eDatabase'));
  });

  beforeEach(async () => {
    await resetDatabase(e2e.dataSource);
  });

  afterAll(async () => {
    await e2e.app.close();
  });

  it('starts Google OAuth without calling the provider and stores a state cookie', async () => {
    const response = await request(e2e.app.getHttpServer())
      .get('/auth/google')
      .redirects(0)
      .expect(302);

    const redirect = new URL(response.headers.location);
    expect(redirect.origin).toBe('https://accounts.google.com');
    expect(redirect.pathname).toBe('/o/oauth2/v2/auth');
    expect(redirect.searchParams.get('state')).toEqual(expect.any(String));

    const stateCookie = getSetCookie(response.headers, 'oauth_state_google');
    expect(stateCookie).toContain('HttpOnly');
    expect(stateCookie).toContain('Path=/auth');
    expect(stateCookie).toContain('SameSite=Lax');
  });

  it('rotates a refresh token through OriginGuard, cookie parsing, Passport and PostgreSQL', async () => {
    const { user, refreshToken } = await createAuthenticatedUser(
      e2e.dataSource,
      e2e.authService,
    );
    const refreshTokenBefore = await e2e.dataSource
      .getRepository(User)
      .findOneByOrFail({ id: user.id });

    const response = await request(e2e.app.getHttpServer())
      .post('/auth/refresh-token')
      .set('Origin', TEST_FRONTEND_ORIGIN)
      .set('Cookie', [`refreshToken=${refreshToken}`])
      .expect(201);

    expect(typeof getResponseBody(response.body).accessToken).toBe('string');
    const refreshedCookie = getSetCookie(response.headers, 'refreshToken');
    expect(refreshedCookie).toContain('HttpOnly');
    expect(refreshedCookie).toContain('Path=/auth');
    expect(refreshedCookie).toContain('SameSite=Lax');

    const refreshTokenAfter = await e2e.dataSource
      .getRepository(User)
      .findOneByOrFail({ id: user.id });
    expect(refreshTokenAfter.refreshToken).not.toBe(
      refreshTokenBefore.refreshToken,
    );
  });

  it('returns the public forbidden contract when refresh requests have an invalid origin', async () => {
    const { refreshToken } = await createAuthenticatedUser(
      e2e.dataSource,
      e2e.authService,
    );

    const response = await request(e2e.app.getHttpServer())
      .post('/auth/refresh-token')
      .set('Origin', 'https://not-allowed.example')
      .set('Cookie', [`refreshToken=${refreshToken}`])
      .expect(403);

    expect(response.body).toMatchObject({
      ok: false,
      code: 'AUTH_FORBIDDEN',
    });
  });
});

function getSetCookie(headers: unknown, name: string): string {
  if (!isRecord(headers)) {
    throw new Error('Expected response headers');
  }

  const cookies = headers['set-cookie'];
  const values =
    typeof cookies === 'string'
      ? [cookies]
      : Array.isArray(cookies) &&
          cookies.every((value) => typeof value === 'string')
        ? cookies
        : undefined;
  const cookie = values?.find((value) => value.startsWith(`${name}=`));

  if (!cookie) {
    throw new Error(`Expected ${name} Set-Cookie header`);
  }

  return cookie;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getResponseBody(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error('Expected an object response body');
  }

  return value;
}
