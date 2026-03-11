import { Controller, Get, Req } from '@nestjs/common';

@Controller('debug')
export class DebugController {
  @Get('sentry')
  sentryError() {
    throw new Error('This is a test error for Sentry!');
  }
  @Get('/debug/trace-check')
  traceCheck(@Req() req: Request) {
    console.log('sentry-trace =', req.headers['sentry-trace']);
    console.log('baggage =', req.headers['baggage']);
    return { ok: true };
  }
}
