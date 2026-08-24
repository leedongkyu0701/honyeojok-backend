import * as Sentry from '@sentry/nestjs';
import { getEnvironment } from './config/environment';

const environment = getEnvironment();

Sentry.init({
  dsn: environment.SENTRY_DSN,
  environment: environment.APP_ENV,
  enabled: environment.SENTRY_ENABLED,
  tracesSampleRate: environment.SENTRY_TRACES_SAMPLE_RATE,
  sendDefaultPii: false,
});
