import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { TripRoutesService } from './trip-routes.service';
import { CreateTripRouteDto } from './dtos/create-trip-route.dto';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserRole, type JwtUser } from 'src/types/user';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtOptionalGuard } from 'src/auth/guards/jwt-optional.guard';
import { HttpCache } from 'src/common/decorators/http-cache.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { GetNearbySpotsQueryDto } from './dtos/get-nearby-spots.query.dto';

@ApiTags('TripRoutes')
@Controller('trip-routes')
export class TripRoutesController {
  constructor(private readonly tripRoutesService: TripRoutesService) {}

  @Get('hot')
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  @ApiOperation({ summary: '인기 여행 루트 조회' })
  getHotRoutes() {
    return this.tripRoutesService.findHotRoutes();
  }

  @Get('region/:region')
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  @ApiOperation({ summary: '지역별 여행 루트 목록 조회' })
  getRoutesByRegion(@Param('region') region: string) {
    return this.tripRoutesService.findByRegion(region);
  }

  @Get('nearby-spots/:routeSlug')
  @ApiOperation({ summary: '여행 루트 주변 스팟 조회' })
  @HttpCache({ maxAge: 300, sMaxAge: 3600, swr: 300 })
  getNearbySpots(
    @Param('routeSlug') routeSlug: string,
    @Query() query: GetNearbySpotsQueryDto,
  ) {
    return this.tripRoutesService.getNearbySpots(
      routeSlug,
      query.radiusKm ?? 3,
      query.categories,
      query.limit,
    );
  }

  @UseGuards(JwtOptionalGuard)
  @Get('region/:region/:slug')
  @ApiOperation({ summary: '여행 루트 상세 조회' })
  @ApiBearerAuth('access-token')
  getRouteDetail(
    @Param('region') region: string,
    @Param('slug') slug: string,
    @CurrentUser() user?: JwtUser,
  ) {
    return this.tripRoutesService.findByRegionAndSlug(region, slug, user?.id);
  }

  @UseGuards(JwtAccessGuard)
  @Post('bookmark/:slug')
  @ApiOperation({ summary: '여행 루트 북마크 토글' })
  @ApiBearerAuth('access-token')
  toggleBookmark(@CurrentUser() user: JwtUser, @Param('slug') slug: string) {
    return this.tripRoutesService.toggleBookmark(user.id, slug);
  }

  @UseGuards(JwtAccessGuard)
  @Put('bookmark/add/:slug')
  @ApiOperation({ summary: '여행 루트 북마크 추가' })
  @ApiBearerAuth('access-token')
  addBookmark(@CurrentUser() user: JwtUser, @Param('slug') slug: string) {
    return this.tripRoutesService.addBookmark(user.id, slug);
  }

  @UseGuards(JwtAccessGuard)
  @Delete('bookmark/remove/:slug')
  @ApiOperation({ summary: '여행 루트 북마크 삭제' })
  @ApiBearerAuth('access-token')
  removeBookmark(@CurrentUser() user: JwtUser, @Param('slug') slug: string) {
    return this.tripRoutesService.removeBookmark(user.id, slug);
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({ summary: '여행 루트 생성' })
  create(@Body() body: CreateTripRouteDto) {
    return this.tripRoutesService.createOne(body);
  }
}
