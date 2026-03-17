import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 0.05,
  sendDefaultPii: true,
});
