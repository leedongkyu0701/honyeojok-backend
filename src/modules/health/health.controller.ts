import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Health')
@SkipThrottle({ default: true })
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: '헬스 체크' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
