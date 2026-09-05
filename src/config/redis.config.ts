import { registerAs } from '@nestjs/config';
import { getEnvironment } from './environment';

export const redisConfig = registerAs('redis', () => {
  const env = getEnvironment();

  return {
    enabled: Boolean(env.REDIS_URL),
    url: env.REDIS_URL,
  };
});
