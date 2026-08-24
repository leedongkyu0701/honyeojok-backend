import { z } from 'zod';

const requiredString = z.string().trim().min(1);

const booleanFromEnvironment = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

const numberFromEnvironment = (label: string, schema: z.ZodNumber) =>
  z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?$/, `${label} must be a number`)
    .transform(Number)
    .pipe(schema);

const portFromEnvironment = (label: string) =>
  numberFromEnvironment(label, z.number().int().min(1).max(65535));

const origin = z
  .string()
  .trim()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      !url.username &&
      !url.password &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash
    );
  }, 'must be an HTTP(S) origin without credentials, a path, query string, or hash')
  .transform((value) => new URL(value).origin);

const optionalString = z.preprocess(
  (value) => (value === '' ? undefined : value),
  requiredString.optional(),
);

const optionalUrl = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z
    .string()
    .trim()
    .url()
    .transform((value) => value.replace(/\/+$/, ''))
    .optional(),
);

const corsOrigins = z
  .string()
  .trim()
  .min(1)
  .transform((value) => value.split(',').map((item) => item.trim()))
  .pipe(z.array(origin).min(1))
  .transform((origins) => [...new Set(origins)]);

export const databaseEnvSchema = z.object({
  DB_HOST: requiredString,
  DB_PORT: portFromEnvironment('DB_PORT'),
  DB_USER: requiredString,
  DB_PASSWORD: requiredString,
  DB_NAME: requiredString,
  DB_SSL: booleanFromEnvironment,
});

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    APP_ENV: z.enum(['local', 'development', 'staging', 'production', 'test']),
    PORT: portFromEnvironment('PORT'),

    FRONTEND_BASE_URL: origin,
    CORS_ORIGINS: corsOrigins,
    TRUST_PROXY: booleanFromEnvironment,
    SWAGGER_ENABLED: booleanFromEnvironment,
    EXPOSE_ERROR_DETAILS: booleanFromEnvironment,

    LOG_LEVEL: z.enum([
      'trace',
      'debug',
      'info',
      'warn',
      'error',
      'fatal',
      'silent',
    ]),
    LOG_PRETTY: booleanFromEnvironment,

    ...databaseEnvSchema.shape,

    JWT_ACCESS_SECRET_KEY: requiredString.min(32),
    JWT_REFRESH_SECRET_KEY: requiredString.min(32),
    COOKIE_SECURE: booleanFromEnvironment,
    COOKIE_SAMESITE: z.enum(['lax', 'strict', 'none']),

    KAKAO_CLIENT_ID: requiredString,
    KAKAO_CLIENT_SECRET: requiredString,
    KAKAO_REDIRECT_URI: z.string().trim().url(),
    GOOGLE_CLIENT_ID: requiredString,
    GOOGLE_CLIENT_SECRET: requiredString,
    GOOGLE_REDIRECT_URI: z.string().trim().url(),
    NAVER_CLIENT_ID: requiredString,
    NAVER_CLIENT_SECRET: requiredString,
    NAVER_REDIRECT_URI: z.string().trim().url(),

    IMAGE_UPLOAD_ENABLED: booleanFromEnvironment,
    R2_ACCOUNT_ID: optionalString,
    R2_ACCESS_KEY_ID: optionalString,
    R2_SECRET_ACCESS_KEY: optionalString,
    R2_BUCKET_NAME: optionalString,
    R2_PUBLIC_URL: optionalUrl,

    SENTRY_ENABLED: booleanFromEnvironment,
    SENTRY_DSN: optionalUrl,
    SENTRY_TRACES_SAMPLE_RATE: numberFromEnvironment(
      'SENTRY_TRACES_SAMPLE_RATE',
      z.number().min(0).max(1),
    ),
  })
  .superRefine((env, ctx) => {
    const nodeAppEnvironmentPairs = {
      local: 'development',
      development: 'production',
      staging: 'production',
      production: 'production',
      test: 'test',
    } as const;

    if (env.NODE_ENV !== nodeAppEnvironmentPairs[env.APP_ENV]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NODE_ENV'],
        message: `NODE_ENV must be ${nodeAppEnvironmentPairs[env.APP_ENV]} when APP_ENV is ${env.APP_ENV}`,
      });
    }

    if (!env.CORS_ORIGINS.includes(env.FRONTEND_BASE_URL)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['CORS_ORIGINS'],
        message: 'must include FRONTEND_BASE_URL',
      });
    }

    if (env.COOKIE_SAMESITE === 'none' && !env.COOKIE_SECURE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['COOKIE_SECURE'],
        message: 'must be true when COOKIE_SAMESITE is none',
      });
    }

    if (env.IMAGE_UPLOAD_ENABLED) {
      const requiredR2Keys = [
        'R2_ACCOUNT_ID',
        'R2_ACCESS_KEY_ID',
        'R2_SECRET_ACCESS_KEY',
        'R2_BUCKET_NAME',
        'R2_PUBLIC_URL',
      ] as const;

      for (const key of requiredR2Keys) {
        if (!env[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key],
            message: `${key} is required when IMAGE_UPLOAD_ENABLED is true`,
          });
        }
      }
    }

    if (env.SENTRY_ENABLED && !env.SENTRY_DSN) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['SENTRY_DSN'],
        message: 'SENTRY_DSN is required when SENTRY_ENABLED is true',
      });
    }
  });

export type EnvironmentVariables = z.infer<typeof envSchema>;

export type DatabaseEnvironmentVariables = Pick<
  EnvironmentVariables,
  keyof typeof databaseEnvSchema.shape
>;
