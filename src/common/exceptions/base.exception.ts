import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  /**
   * Common
   */
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_UNAVAILABLE = 'EXTERNAL_SERVICE_UNAVAILABLE',
  RATE_LIMITED = 'RATE_LIMITED',

  /**
   * Auth
   */
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  AUTH_FORBIDDEN = 'AUTH_FORBIDDEN',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_INVALID_TOKEN = 'AUTH_INVALID_TOKEN',
  AUTH_REFRESH_INVALID = 'AUTH_REFRESH_INVALID',
  AUTH_WITHDRAWN_USER = 'AUTH_WITHDRAWN_USER',

  /**
   * OAuth (Social)
   */
  OAUTH_FAILED = 'OAUTH_FAILED',
  OAUTH_CONFIG_MISSING = 'OAUTH_CONFIG_MISSING',

  /**
   * Conflict / Duplicate
   */
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',

  /**
   * Upload / File (R2, image upload)
   */
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FILE_TOO_MANY = 'FILE_TOO_MANY',
  FILE_INVALID_TYPE = 'FILE_INVALID_TYPE',
  FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED',
}

export type ErrorResponseBody = {
  ok: false;
  code: ErrorCode;
  message: string;
  details?: unknown; // 토큰/비번/개인정보 금지
};

export class BaseException extends HttpException {
  public readonly code: ErrorCode;
  constructor(
    message: string,
    code: ErrorCode,
    status: HttpStatus,
    details?: unknown,
  ) {
    super(
      { ok: false, message, code, details } satisfies ErrorResponseBody,
      status,
    );
    this.code = code;
  }

  // ---- Optional helpers ----
  static badRequest(message: string, code: ErrorCode, details?: unknown) {
    return new BaseException(message, code, HttpStatus.BAD_REQUEST, details);
  }

  static unauthorized(message: string, code: ErrorCode, details?: unknown) {
    return new BaseException(message, code, HttpStatus.UNAUTHORIZED, details);
  }

  static forbidden(message: string, code: ErrorCode, details?: unknown) {
    return new BaseException(message, code, HttpStatus.FORBIDDEN, details);
  }

  static notFound(message: string, code: ErrorCode, details?: unknown) {
    return new BaseException(message, code, HttpStatus.NOT_FOUND, details);
  }

  static conflict(message: string, code: ErrorCode, details?: unknown) {
    return new BaseException(message, code, HttpStatus.CONFLICT, details);
  }

  static tooManyRequests(message: string, details?: unknown) {
    return new BaseException(
      message,
      ErrorCode.RATE_LIMITED,
      HttpStatus.TOO_MANY_REQUESTS,
      details,
    );
  }

  static serviceUnavailable(message: string, details?: unknown) {
    return new BaseException(
      message,
      ErrorCode.EXTERNAL_SERVICE_UNAVAILABLE,
      HttpStatus.SERVICE_UNAVAILABLE,
      details,
    );
  }
}
