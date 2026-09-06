import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@SkipThrottle({ default: true })
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: '애플리케이션 liveness (legacy alias)' })
  check() {
    return this.live();
  }

  @Get('live')
  @HealthCheck()
  @ApiOperation({ summary: '애플리케이션 liveness' })
  live() {
    return this.health.check([]);
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: '애플리케이션 및 PostgreSQL readiness' })
  ready() {
    return this.health.check([() => this.database.pingCheck('postgresql')]);
  }
}
