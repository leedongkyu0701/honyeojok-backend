import { registerAs } from '@nestjs/config';
import { getEnvironment } from './environment';

export const observabilityConfig = registerAs('observability', () => {
  const env = getEnvironment();

  return {
    sentry: {
      enabled: env.SENTRY_ENABLED,
      dsn: env.SENTRY_DSN,
      tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE,
    },
  };
});
