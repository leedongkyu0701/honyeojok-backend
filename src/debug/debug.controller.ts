import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class DebugController {
  @Get('sentry')
  sentryError() {
    throw new Error('This is a test error for Sentry!');
  }
}
