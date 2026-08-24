import { registerAs } from '@nestjs/config';
import { getEnvironment } from './environment';

export const appConfig = registerAs('app', () => {
  const env = getEnvironment();

  return {
    nodeEnvironment: env.NODE_ENV,
    environment: env.APP_ENV,
    port: env.PORT,
    frontendBaseUrl: env.FRONTEND_BASE_URL,
    corsOrigins: env.CORS_ORIGINS,
    trustProxyHops: env.TRUST_PROXY_HOPS,
    swaggerEnabled: env.SWAGGER_ENABLED,
    exposeErrorDetails: env.EXPOSE_ERROR_DETAILS,
  };
});
