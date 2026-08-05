import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { Param } from '@nestjs/common';
import { CreateSpotRequestDto } from './dto/request/create-spot.request.dto';
import { FindSpotsQuery } from './dto/query/find-spots.query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpCache } from 'src/common/decorators/http-cache.decorator';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/enums/user-role.enum';

@ApiTags('Spots')
@Controller('spots')
export class SpotsController {
  constructor(private readonly spotService: SpotsService) {}

  @Get('recommended')
  @ApiOperation({ summary: '추천 관광지 목록 조회' })
  async findRecommended() {
    return this.spotService.findRecommended();
  }

  @Get('hot')
  @ApiOperation({ summary: '인기 관광지 목록 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  async findHot() {
    return this.spotService.findHot();
  }

  @Get('region/:region')
  @ApiOperation({ summary: '지역별 관광지 목록 조회' })
  @HttpCache({ maxAge: 600, sMaxAge: 300, swr: 60 })
  async find(@Param('region') region: string, @Query() query: FindSpotsQuery) {
    return this.spotService.findByQuery(query, region);
  }

  @Get(':id')
  @ApiOperation({ summary: '관광지 상세 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  async findById(@Param('id') id: string) {
    return this.spotService.findById(Number(id));
  }

  @Post()
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '관광지 데이터 생성' })
  create(@Body() createSpotDto: CreateSpotRequestDto) {
    return this.spotService.createOne(createSpotDto);
  }
}
