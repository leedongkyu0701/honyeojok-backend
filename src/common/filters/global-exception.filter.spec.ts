import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { GlobalExceptionFilter } from './global-exception.filter';

type SentryScopeMock = {
  setTag: ReturnType<typeof vi.fn>;
  setUser: ReturnType<typeof vi.fn>;
  setContext: ReturnType<typeof vi.fn>;
};

const sentryMocks = vi.hoisted(() => ({
  captureException: vi.fn(),
  withScope: vi.fn<(callback: (scope: SentryScopeMock) => void) => void>(),
}));

vi.mock('@sentry/nestjs', () => sentryMocks);

describe('GlobalExceptionFilter', () => {
  const scope = {
    setTag: vi.fn(),
    setUser: vi.fn(),
    setContext: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01T00:00:00.000Z'));
    vi.clearAllMocks();
    sentryMocks.withScope.mockImplementation((callback) => callback(scope));
    vi.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('transforms a PostgreSQL unique violation into the public duplicate contract', () => {
    const filter = createFilter();
    const exception = new QueryFailedError('INSERT INTO tags', [], {
      code: '23505',
    } as unknown as Error);
    const { response, host } = createHttpHost({
      requestId: 'request-1',
      user: { id: 7 },
    });

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(response.json).toHaveBeenCalledWith({
      ok: false,
      code: ErrorCode.DUPLICATE_RESOURCE,
      message: 'Duplicate resource',
      requestId: 'request-1',
      path: '/posts/1',
      timestamp: '2026-09-01T00:00:00.000Z',
    });
    expect(scope.setTag).toHaveBeenCalledWith('type', 'db_error');
    expect(scope.setUser).toHaveBeenCalledWith({ id: 7 });
    expect(sentryMocks.captureException).toHaveBeenCalledWith(exception);
  });

  it('does not expose non-unique database errors', () => {
    const filter = createFilter();
    const exception = new QueryFailedError('SELECT * FROM posts', [], {
      code: '42P01',
    } as unknown as Error);
    const { response, host } = createHttpHost();

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Database error',
      }),
    );
  });

  it('formats ValidationPipe messages as a single validation failure', () => {
    const filter = createFilter();
    const { response, host } = createHttpHost();

    filter.catch(
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['title must not be empty', 'title must be a string'],
        },
        HttpStatus.BAD_REQUEST,
      ),
      host,
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'title must not be empty, title must be a string',
      }),
    );
  });

  it.each([
    [HttpStatus.UNAUTHORIZED, ErrorCode.AUTH_UNAUTHORIZED],
    [HttpStatus.FORBIDDEN, ErrorCode.AUTH_FORBIDDEN],
    [HttpStatus.NOT_FOUND, ErrorCode.RESOURCE_NOT_FOUND],
    [HttpStatus.TOO_MANY_REQUESTS, ErrorCode.RATE_LIMITED],
    [HttpStatus.SERVICE_UNAVAILABLE, ErrorCode.EXTERNAL_SERVICE_UNAVAILABLE],
  ])('uses the correct fallback code for HTTP %s', (status, expectedCode) => {
    const filter = createFilter();
    const { response, host } = createHttpHost();

    filter.catch(new HttpException('Request failed', status), host);

    expect(response.status).toHaveBeenCalledWith(status);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: expectedCode,
        message: 'Request failed',
      }),
    );
  });

  it.each([true, false])(
    'includes BaseException details only when exposeErrorDetails is %s',
    (exposeErrorDetails) => {
      const filter = createFilter(exposeErrorDetails);
      const { response, host } = createHttpHost();

      filter.catch(
        BaseException.badRequest('Invalid destination', ErrorCode.BAD_REQUEST, {
          field: 'destinationSlug',
        }),
        host,
      );

      const body = response.json.mock.calls[0][0] as Record<string, unknown>;
      expect(body).toMatchObject({
        code: ErrorCode.BAD_REQUEST,
        message: 'Invalid destination',
      });
      if (exposeErrorDetails) {
        expect(body.details).toEqual({ field: 'destinationSlug' });
      } else {
        expect(body).not.toHaveProperty('details');
      }
    },
  );

  it('returns a stable internal-error response for unknown exceptions', () => {
    const filter = createFilter();
    const exception = new Error('unexpected failure');
    const { response, host } = createHttpHost();

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Unexpected error',
      }),
    );
    expect(scope.setTag).toHaveBeenCalledWith('type', 'unknown_error');
    expect(sentryMocks.captureException).toHaveBeenCalledWith(exception);
  });
});

function createFilter(exposeErrorDetails = false): GlobalExceptionFilter {
  return new GlobalExceptionFilter({ exposeErrorDetails } as never);
}

function createHttpHost(requestOverrides: Record<string, unknown> = {}) {
  const response = { status: vi.fn(), json: vi.fn() };
  response.status.mockReturnValue(response);
  const request = {
    originalUrl: '/posts/1',
    method: 'POST',
    ...requestOverrides,
  };
  const host = {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  } as unknown as ArgumentsHost;

  return { response, host };
}
