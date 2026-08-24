import { registerAs } from '@nestjs/config';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { getEnvironment } from './environment';

export const loggerConfig = registerAs('logger', () => {
  const env = getEnvironment();

  return {
    level: env.LOG_LEVEL,
    pretty: env.LOG_PRETTY,
  };
});

const sensitiveQueryParameters = new Set([
  'code',
  'state',
  'token',
  'access_token',
  'refresh_token',
  'id_token',
]);

function sanitizeRequestUrl(originalUrl: string): string {
  const url = new URL(originalUrl, 'http://localhost');

  for (const parameter of url.searchParams.keys()) {
    if (
      sensitiveQueryParameters.has(parameter.toLowerCase()) ||
      parameter.toLowerCase().includes('token')
    ) {
      url.searchParams.set(parameter, '[REDACTED]');
    }
  }

  return `${url.pathname}${url.search}`;
}

export function createPinoHttpOptions(config: {
  level: string;
  pretty: boolean;
}) {
  return {
    level: config.level,
    transport: config.pretty
      ? {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            translateTime: 'SYS:standard',
          },
        }
      : undefined,
    genReqId: (req: Request, res: Response) => {
      const headerRequestId =
        req.headers['x-request-id']?.toString() ||
        req.headers['x-correlation-id']?.toString();
      const requestId = headerRequestId || randomUUID();

      req.requestId = requestId;
      res.setHeader('x-request-id', requestId);
      return requestId;
    },
    customLogLevel: (_req: Request, res: Response, err?: Error) => {
      if (err || res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
    autoLogging: {
      ignore: (req: Request) =>
        ['/health', '/docs', '/favicon.ico'].includes(req.path),
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers.set-cookie',
        'res.headers["set-cookie"]',
      ],
      censor: '[REDACTED]',
    },
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: sanitizeRequestUrl(req.originalUrl),
        };
      },
      res(res: Response) {
        return { statusCode: res.statusCode };
      },
    },
  };
}
