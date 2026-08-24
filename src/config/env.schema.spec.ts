import { parseEnvironment } from './environment';

const validLocalEnvironment: Record<string, string> = {
  NODE_ENV: 'development',
  APP_ENV: 'local',
  PORT: '5001',
  FRONTEND_BASE_URL: 'http://localhost:3000',
  CORS_ORIGINS: 'http://localhost:3000',
  TRUST_PROXY: 'false',
  SWAGGER_ENABLED: 'true',
  EXPOSE_ERROR_DETAILS: 'true',
  LOG_LEVEL: 'debug',
  LOG_PRETTY: 'true',
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USER: 'test-user',
  DB_PASSWORD: 'test-password',
  DB_NAME: 'honyeojok_test',
  DB_SSL: 'false',
  JWT_ACCESS_SECRET_KEY: 'a'.repeat(32),
  JWT_REFRESH_SECRET_KEY: 'b'.repeat(32),
  COOKIE_SECURE: 'false',
  COOKIE_SAMESITE: 'lax',
  KAKAO_CLIENT_ID: 'kakao-client-id',
  KAKAO_CLIENT_SECRET: 'kakao-client-secret',
  KAKAO_REDIRECT_URI: 'http://localhost:5001/auth/kakao/callback',
  GOOGLE_CLIENT_ID: 'google-client-id',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',
  GOOGLE_REDIRECT_URI: 'http://localhost:5001/auth/google/callback',
  NAVER_CLIENT_ID: 'naver-client-id',
  NAVER_CLIENT_SECRET: 'naver-client-secret',
  NAVER_REDIRECT_URI: 'http://localhost:5001/auth/naver/callback',
  IMAGE_UPLOAD_ENABLED: 'false',
  R2_ACCOUNT_ID: '',
  R2_ACCESS_KEY_ID: '',
  R2_SECRET_ACCESS_KEY: '',
  R2_BUCKET_NAME: '',
  R2_PUBLIC_URL: '',
  SENTRY_ENABLED: 'false',
  SENTRY_DSN: '',
  SENTRY_TRACES_SAMPLE_RATE: '0.05',
};

function environment(overrides: Partial<Record<string, string>> = {}) {
  return { ...validLocalEnvironment, ...overrides };
}

describe('environment schema', () => {
  it('parses a valid local configuration', () => {
    const parsed = parseEnvironment(environment());

    expect(parsed.NODE_ENV).toBe('development');
    expect(parsed.APP_ENV).toBe('local');
    expect(parsed.PORT).toBe(5001);
    expect(parsed.TRUST_PROXY).toBe(false);
    expect(parsed.DB_SSL).toBe(false);
  });

  it('parses a valid production configuration', () => {
    const parsed = parseEnvironment(
      environment({
        NODE_ENV: 'production',
        APP_ENV: 'production',
        FRONTEND_BASE_URL: 'https://www.honyeojok.com',
        CORS_ORIGINS: 'https://www.honyeojok.com,https://honyeojok.com',
        SWAGGER_ENABLED: 'false',
        EXPOSE_ERROR_DETAILS: 'false',
        LOG_LEVEL: 'info',
        LOG_PRETTY: 'false',
        DB_SSL: 'true',
        COOKIE_SECURE: 'true',
      }),
    );

    expect(parsed.APP_ENV).toBe('production');
    expect(parsed.CORS_ORIGINS).toEqual([
      'https://www.honyeojok.com',
      'https://honyeojok.com',
    ]);
  });

  it.each([
    ['NODE_ENV', 'staging'],
    ['APP_ENV', 'preview'],
    ['PORT', '70000'],
  ])('rejects an invalid %s value', (key, value) => {
    expect(() => parseEnvironment(environment({ [key]: value }))).toThrow(
      'Invalid environment configuration',
    );
  });

  it('rejects a NODE_ENV and APP_ENV combination with conflicting meanings', () => {
    expect(() =>
      parseEnvironment(
        environment({ NODE_ENV: 'development', APP_ENV: 'staging' }),
      ),
    ).toThrow('NODE_ENV must be production when APP_ENV is staging');
  });

  it('parses the string false as boolean false', () => {
    const parsed = parseEnvironment(
      environment({
        SWAGGER_ENABLED: 'false',
        EXPOSE_ERROR_DETAILS: 'false',
        TRUST_PROXY: 'false',
        LOG_PRETTY: 'false',
        DB_SSL: 'false',
        IMAGE_UPLOAD_ENABLED: 'false',
        SENTRY_ENABLED: 'false',
      }),
    );

    expect(parsed.SWAGGER_ENABLED).toBe(false);
    expect(parsed.TRUST_PROXY).toBe(false);
    expect(parsed.DB_SSL).toBe(false);
    expect(parsed.IMAGE_UPLOAD_ENABLED).toBe(false);
    expect(parsed.SENTRY_ENABLED).toBe(false);
  });

  it('parses TRUST_PROXY=true as boolean true', () => {
    const parsed = parseEnvironment(environment({ TRUST_PROXY: 'true' }));

    expect(parsed.TRUST_PROXY).toBe(true);
  });

  it.each(['1', 'yes'])('rejects an invalid TRUST_PROXY value: %s', (value) => {
    expect(() => parseEnvironment(environment({ TRUST_PROXY: value }))).toThrow(
      'Invalid environment configuration',
    );
  });

  it('requires every R2 value when uploads are enabled', () => {
    expect(() =>
      parseEnvironment(
        environment({
          IMAGE_UPLOAD_ENABLED: 'true',
          R2_ACCOUNT_ID: 'account',
        }),
      ),
    ).toThrow('R2_ACCESS_KEY_ID is required');
  });

  it('requires a Sentry DSN when Sentry is enabled', () => {
    expect(() =>
      parseEnvironment(environment({ SENTRY_ENABLED: 'true' })),
    ).toThrow('SENTRY_DSN is required');
  });

  it('requires secure cookies when SameSite is none', () => {
    expect(() =>
      parseEnvironment(
        environment({ COOKIE_SAMESITE: 'none', COOKIE_SECURE: 'false' }),
      ),
    ).toThrow('COOKIE_SECURE: must be true');
  });

  it('normalizes and de-duplicates CORS origins', () => {
    const parsed = parseEnvironment(
      environment({
        CORS_ORIGINS:
          ' http://localhost:3000/, https://www.honyeojok.com, http://localhost:3000 ',
      }),
    );

    expect(parsed.CORS_ORIGINS).toEqual([
      'http://localhost:3000',
      'https://www.honyeojok.com',
    ]);
  });
});
