import * as Sentry from '@sentry/nestjs';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import type { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
  ErrorCode,
  type ErrorResponseBody,
} from 'src/common/exceptions/base.exception';
import { Logger } from '@nestjs/common';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { appConfig } from 'src/config/app.config';

type ApiErrorResponse = ErrorResponseBody & {
  requestId?: string;
  path: string;
  timestamp: string;
};

function getFallbackCode(statusCode: number): ErrorCode {
  if (statusCode === 401) return ErrorCode.AUTH_UNAUTHORIZED;
  if (statusCode === 403) return ErrorCode.AUTH_FORBIDDEN;
  if (statusCode === 404) return ErrorCode.RESOURCE_NOT_FOUND;
  if (statusCode === 429) return ErrorCode.RATE_LIMITED;
  if (statusCode === 503) return ErrorCode.EXTERNAL_SERVICE_UNAVAILABLE;
  if (statusCode >= 500) return ErrorCode.INTERNAL_ERROR;
  return ErrorCode.BAD_REQUEST;
}

function normalizeMessageFromResponse(
  response: string | object,
  fallback: string,
): string {
  if (typeof response === 'string') return response;

  if (
    typeof response === 'object' &&
    response !== null &&
    'message' in response
  ) {
    const msg = (response as { message?: unknown }).message;

    if (Array.isArray(msg)) return msg.join(', ');
    if (typeof msg === 'string') return msg;
  }

  return fallback;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const path = req.originalUrl;
    const timestamp = new Date().toISOString();
    const requestId = req.requestId;
    const user = req.user as JwtUser | undefined;

    // -----------------------
    // 1) DB 에러(선처리)
    // -----------------------
    if (exception instanceof QueryFailedError) {
      Sentry.withScope((scope) => {
        scope.setTag('type', 'db_error');
        scope.setTag('path', path);
        scope.setTag('method', req.method);

        if (requestId) {
          scope.setTag('requestId', requestId);
        }

        if (user) {
          scope.setUser({
            id: user.id,
          });
        }

        scope.setContext('request', {
          method: req.method,
          url: req.originalUrl,
          requestId,
        });

        Sentry.captureException(exception);
      });
      // TypeORM 버전/드라이버에 따라 타입이 애매할 수 있어 최소만 사용
      const driverErr = exception.driverError as unknown as { code?: string };
      this.logger.error(
        {
          type: 'db_error',
          method: req.method,
          path,
          requestId,
          userId: user?.id,
          dbCode: driverErr?.code,
          err: exception,
        },
        'Database query failed',
      );

      // Postgres unique violation: 23505
      if (driverErr?.code === '23505') {
        const statusCode = HttpStatus.CONFLICT;

        const body: ApiErrorResponse = {
          ok: false,
          code: ErrorCode.DUPLICATE_RESOURCE,
          message: 'Duplicate resource',
          requestId,
          path,
          timestamp,
        };

        return res.status(statusCode).json(body);
      }

      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      const body: ApiErrorResponse = {
        ok: false,
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Database error',
        requestId,
        path,
        timestamp,
      };

      return res.status(statusCode).json(body);
    }

    // -----------------------
    // 2) HttpException (BaseException 포함)
    // -----------------------
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      if (statusCode >= 500) {
        Sentry.withScope((scope) => {
          scope.setTag('type', 'http_error');
          scope.setTag('path', path);
          scope.setTag('method', req.method);

          if (requestId) {
            scope.setTag('requestId', requestId);
          }

          if (user) {
            scope.setUser({
              id: user.id,
            });
          }

          scope.setContext('request', {
            method: req.method,
            url: req.originalUrl,
            requestId,
          });

          Sentry.captureException(exception);
        });

        this.logger.error(
          {
            type: 'http_error',
            method: req.method,
            path,
            requestId,
            userId: user?.id,
            statusCode,
            err: exception,
          },
          'Unhandled HTTP exception',
        );
      }
      const response = exception.getResponse();
      const fallbackCode = getFallbackCode(statusCode);

      // BaseException이 만든 형태면 code/details를 최대한 존중
      let code: ErrorCode = fallbackCode;
      let details: unknown = undefined;

      if (typeof response === 'object' && response !== null) {
        const obj = response as Partial<ErrorResponseBody> & {
          message?: unknown;
        };

        // ValidationPipe(400 + message 배열)면 VALIDATION_FAILED로
        const isValidation = statusCode === 400 && Array.isArray(obj.message);

        code =
          obj.code ??
          (isValidation ? ErrorCode.VALIDATION_FAILED : fallbackCode);

        details = obj.details;
      }

      const message = normalizeMessageFromResponse(response, exception.message);

      const body: ApiErrorResponse = {
        ok: false,
        code,
        message,
        details: this.config.exposeErrorDetails ? details : undefined,
        requestId,
        path,
        timestamp,
      };

      if (!this.config.exposeErrorDetails) delete body.details;

      return res.status(statusCode).json(body);
    }

    // -----------------------
    // 3) Unknown error
    // -----------------------
    Sentry.withScope((scope) => {
      scope.setTag('type', 'unknown_error');
      scope.setTag('path', path);
      scope.setTag('method', req.method);

      if (requestId) {
        scope.setTag('requestId', requestId);
      }

      scope.setContext('request', {
        method: req.method,
        url: req.originalUrl,
        requestId,
      });

      if (user) {
        scope.setUser({
          id: user.id,
        });
      }

      Sentry.captureException(exception);
    });
    this.logger.error(
      {
        type: 'unknown_error',
        method: req.method,
        path,
        requestId,
        userId: user?.id,
        err: exception,
      },
      'Unexpected unhandled exception',
    );
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const body: ApiErrorResponse = {
      ok: false,
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Unexpected error',
      requestId,
      path,
      timestamp,
    };

    return res.status(statusCode).json(body);
  }
}
