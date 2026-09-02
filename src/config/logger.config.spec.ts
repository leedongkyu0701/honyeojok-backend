import type { Request, Response } from 'express';
import { createPinoHttpOptions } from './logger.config';

const loggerConfig = { level: 'info', pretty: false };

function request(overrides: Record<string, unknown> = {}): Request {
  return {
    headers: {},
    id: 'request-id',
    method: 'GET',
    originalUrl: '/posts/123',
    path: '/posts/123',
    ...overrides,
  } as Request;
}

function response(statusCode = 200): {
  response: Response;
  setHeader: jest.Mock;
} {
  const setHeader = jest.fn();

  return {
    response: { statusCode, setHeader } as unknown as Response,
    setHeader,
  };
}

describe('createPinoHttpOptions', () => {
  it('serializes the raw request URL instead of an already-serialized request', () => {
    const options = createPinoHttpOptions(loggerConfig);

    const serializedRequest = options.serializers.req(request());

    expect(options.wrapSerializers).toBe(false);
    expect(serializedRequest).toEqual({
      id: 'request-id',
      method: 'GET',
      url: '/posts/123',
    });
    expect(serializedRequest.url).not.toBe('/undefined');
  });

  it('redacts sensitive query parameters in serialized request URLs', () => {
    const options = createPinoHttpOptions(loggerConfig);

    const serializedRequest = options.serializers.req(
      request({ originalUrl: '/posts/123?token=secret' }),
    );

    expect(serializedRequest.url).toBe('/posts/123?token=%5BREDACTED%5D');
    expect(serializedRequest.url).not.toContain('secret');
  });

  it.each([
    [{ 'x-request-id': 'request-id' }, 'request-id'],
    [{ 'x-correlation-id': 'correlation-id' }, 'correlation-id'],
    [
      { 'x-request-id': 'request-id', 'x-correlation-id': 'correlation-id' },
      'request-id',
    ],
  ])('reuses request IDs and returns them in the response', (headers, id) => {
    const options = createPinoHttpOptions(loggerConfig);
    const rawRequest = request({ headers });
    const { response: rawResponse, setHeader } = response();

    expect(options.genReqId(rawRequest, rawResponse)).toBe(id);
    expect(rawRequest.requestId).toBe(id);
    expect(setHeader).toHaveBeenCalledWith('x-request-id', id);
  });

  it('generates and returns a request ID when no request-ID header exists', () => {
    const options = createPinoHttpOptions(loggerConfig);
    const rawRequest = request();
    const { response: rawResponse, setHeader } = response();

    const id = options.genReqId(rawRequest, rawResponse);

    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(rawRequest.requestId).toBe(id);
    expect(setHeader).toHaveBeenCalledWith('x-request-id', id);
  });

  it('keeps log levels, ignored paths, header redaction, and transports', () => {
    const options = createPinoHttpOptions(loggerConfig);
    const rawRequest = request();

    expect(options.customLogLevel(rawRequest, response(200).response)).toBe(
      'info',
    );
    expect(options.customLogLevel(rawRequest, response(304).response)).toBe(
      'info',
    );
    expect(options.customLogLevel(rawRequest, response(400).response)).toBe(
      'warn',
    );
    expect(options.customLogLevel(rawRequest, response(500).response)).toBe(
      'error',
    );
    expect(
      options.customLogLevel(rawRequest, response().response, new Error()),
    ).toBe('error');
    expect(options.autoLogging.ignore(request({ path: '/health' }))).toBe(true);
    expect(options.autoLogging.ignore(request({ path: '/docs' }))).toBe(true);
    expect(options.autoLogging.ignore(request({ path: '/favicon.ico' }))).toBe(
      true,
    );
    expect(options.autoLogging.ignore(request({ path: '/posts/123' }))).toBe(
      false,
    );
    expect(options.redact).toEqual({
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers.set-cookie',
        'res.headers["set-cookie"]',
      ],
      censor: '[REDACTED]',
    });
    expect(options.transport).toBeUndefined();
    expect(
      createPinoHttpOptions({ level: 'debug', pretty: true }).transport,
    ).toEqual({
      target: 'pino-pretty',
      options: {
        singleLine: true,
        translateTime: 'SYS:standard',
      },
    });
  });
});
