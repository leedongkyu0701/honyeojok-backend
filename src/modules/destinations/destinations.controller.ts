import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationRequestDto } from './dto/request/create-destination.request.dto';
import { FindDestinationsQuery } from './dto/query/find-destinations.query.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { HttpCache } from 'src/common/decorators/http-cache.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/enums/user-role.enum';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly service: DestinationsService) {}

  @Get()
  @ApiOperation({ summary: '여행지 목록 조회' })
  @HttpCache({ maxAge: 60, sMaxAge: 300, swr: 60 })
  findAll(@Query() query: FindDestinationsQuery) {
    return this.service.findByQuery(query);
  }

  @Get('weekly')
  @ApiOperation({ summary: '주간 추천 여행지 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  findWeekly() {
    return this.service.findWeekly();
  }

  @Get('recommended')
  @ApiOperation({ summary: '월간 추천 여행지 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  findRecommended() {
    return this.service.findRecommended();
  }

  @Get('map')
  @ApiOperation({ summary: '지도용 여행지 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  findMap() {
    return this.service.findMap();
  }

  @Get('search')
  @Throttle({ default: { ttl: 60, limit: 20 } })
  @ApiOperation({ summary: '여행지 검색' })
  search(@Query('q') query: string) {
    return this.service.search(query);
  }

  @Get(':region')
  @ApiOperation({ summary: '지역별 여행지 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  findOne(@Param('region') region: string) {
    return this.service.findByRegion(region);
  }

  @Post()
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '여행지 단건 생성(관리자)' })
  create(@Body() dto: CreateDestinationRequestDto) {
    return this.service.createOne(dto);
  }
}
