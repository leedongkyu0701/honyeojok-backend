import type { IntegrationDatabaseConfig } from '../database/test-data-source';

const TEST_FRONTEND_ORIGIN = 'http://localhost:3000';

export function applyE2eTestEnvironment(
  database: IntegrationDatabaseConfig,
): void {
  Object.assign(process.env, {
    NODE_ENV: 'test',
    APP_ENV: 'test',
    PORT: '3001',
    FRONTEND_BASE_URL: TEST_FRONTEND_ORIGIN,
    CORS_ORIGINS: TEST_FRONTEND_ORIGIN,
    TRUST_PROXY: 'false',
    SWAGGER_ENABLED: 'false',
    EXPOSE_ERROR_DETAILS: 'false',
    LOG_LEVEL: 'silent',
    LOG_PRETTY: 'false',
    DB_HOST: database.host,
    DB_PORT: String(database.port),
    DB_USER: database.username,
    DB_PASSWORD: database.password,
    DB_NAME: database.database,
    DB_SSL: 'false',
    JWT_ACCESS_SECRET_KEY: 'e2e-access-secret-key-must-be-at-least-32-chars',
    JWT_REFRESH_SECRET_KEY: 'e2e-refresh-secret-key-must-be-at-least-32-chars',
    COOKIE_SECURE: 'false',
    COOKIE_SAMESITE: 'lax',
    KAKAO_CLIENT_ID: 'e2e-kakao-client-id',
    KAKAO_CLIENT_SECRET: 'e2e-kakao-client-secret',
    KAKAO_REDIRECT_URI: `${TEST_FRONTEND_ORIGIN}/auth/kakao/callback`,
    GOOGLE_CLIENT_ID: 'e2e-google-client-id',
    GOOGLE_CLIENT_SECRET: 'e2e-google-client-secret',
    GOOGLE_REDIRECT_URI: `${TEST_FRONTEND_ORIGIN}/auth/google/callback`,
    NAVER_CLIENT_ID: 'e2e-naver-client-id',
    NAVER_CLIENT_SECRET: 'e2e-naver-client-secret',
    NAVER_REDIRECT_URI: `${TEST_FRONTEND_ORIGIN}/auth/naver/callback`,
    OAUTH_REQUEST_TIMEOUT_MS: '1000',
    IMAGE_UPLOAD_ENABLED: 'false',
    REDIS_URL: '',
    SENTRY_ENABLED: 'false',
    SENTRY_TRACES_SAMPLE_RATE: '0',
  });

  delete process.env.R2_ACCOUNT_ID;
  delete process.env.R2_ACCESS_KEY_ID;
  delete process.env.R2_SECRET_ACCESS_KEY;
  delete process.env.R2_BUCKET_NAME;
  delete process.env.R2_PUBLIC_URL;
  delete process.env.MEDIA_WORKER_SECRET;
  delete process.env.SENTRY_DSN;
}

export { TEST_FRONTEND_ORIGIN };
