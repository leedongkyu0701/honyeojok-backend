import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { PaginationQueryDto } from 'src/modules/users/dto/query/pagination.query.dto';
import { PostCardResponseDto } from './dto/response/post-card.response.dto';
import { PostsQueryService } from './posts-query.service';

@ApiTags('Users')
@Controller('users/me')
export class UserPostsController {
  constructor(private readonly postsQueryService: PostsQueryService) {}

  @UseGuards(JwtAccessGuard)
  @Get('posts')
  @ApiOperation({ summary: '내 게시글 목록 조회' })
  @ApiBearerAuth('access-token')
  getUserPosts(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationQueryDto,
  ): Promise<{ posts: PostCardResponseDto[]; totalPages: number }> {
    return this.postsQueryService.findByUserId(user.id, query.page, query.take);
  }
}
