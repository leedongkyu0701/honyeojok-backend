// src/common/filters/global-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
  ErrorCode,
  type ErrorResponseBody,
} from '../exceptions/base.exception';

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
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const isProd = process.env.NODE_ENV === 'production';

    const path = req.originalUrl;
    const timestamp = new Date().toISOString();
    const requestId = req.requestId;

    // -----------------------
    // 1) DB 에러(선처리)
    // -----------------------
    if (exception instanceof QueryFailedError) {
      // TypeORM 버전/드라이버에 따라 타입이 애매할 수 있어 최소만 사용
      const driverErr = exception.driverError as unknown as { code?: string };

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

      if (!isProd) console.error(exception);
      return res.status(statusCode).json(body);
    }

    // -----------------------
    // 2) HttpException (BaseException 포함)
    // -----------------------
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse(); // string | object
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
        details: isProd ? undefined : details,
        requestId,
        path,
        timestamp,
      };

      if (isProd) delete body.details;
      if (!isProd && statusCode >= 500) console.error(exception);

      return res.status(statusCode).json(body);
    }

    // -----------------------
    // 3) Unknown error
    // -----------------------
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const body: ApiErrorResponse = {
      ok: false,
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Unexpected error',
      requestId,
      path,
      timestamp,
    };

    if (!isProd) console.error(exception);
    return res.status(statusCode).json(body);
  }
}
