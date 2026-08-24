import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { PaginationQueryDto } from 'src/modules/users/dto/query/pagination.query.dto';
import { BookmarksQueryService } from './bookmarks-query.service';
import { TripRouteCardResponseDto } from './dto/response/trip-route-card.response.dto';

@ApiTags('Users')
@Controller('users/me')
export class UserBookmarksController {
  constructor(private readonly bookmarksQueryService: BookmarksQueryService) {}

  @UseGuards(JwtAccessGuard)
  @Get('bookmarks')
  @ApiOperation({ summary: '내 북마크 목록 조회' })
  @ApiBearerAuth('access-token')
  getUserBookmarks(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationQueryDto,
  ): Promise<{ tripRoutes: TripRouteCardResponseDto[]; totalPages: number }> {
    return this.bookmarksQueryService.findByUserId(
      user.id,
      query.page,
      query.take,
    );
  }
}
