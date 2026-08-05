import { Controller, Get, Patch, UseGuards, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { PaginationQueryDto } from './dto/query/pagination.query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAccessGuard)
  @Get('me')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiBearerAuth('access-token')
  getProfile(@CurrentUser() user: JwtUser) {
    return this.userService.getProfile(user.id);
  }

  @UseGuards(JwtAccessGuard)
  @Patch('me/nickname')
  @ApiOperation({ summary: '내 닉네임 변경' })
  @ApiBearerAuth('access-token')
  async updateNickname(
    @CurrentUser() user: JwtUser,
    @Body('nickName') newNickName: string,
  ) {
    return this.userService.updateNickName(user.id, newNickName);
  }

  @UseGuards(JwtAccessGuard)
  @Get('me/posts')
  @ApiOperation({ summary: '내 게시글 목록 조회' })
  @ApiBearerAuth('access-token')
  async getUserPosts(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.userService.getUserPosts(user.id, query.page, query.take);
  }

  @UseGuards(JwtAccessGuard)
  @Get('me/bookmarks')
  @ApiOperation({ summary: '내 북마크 목록 조회' })
  @ApiBearerAuth('access-token')
  async getUserBookmarks(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.userService.getUserBookmarks(user.id, query.page, query.take);
  }
}
