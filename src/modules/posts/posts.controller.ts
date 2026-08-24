import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  Body,
  Delete,
  Get,
  Param,
  Query,
  UploadedFiles,
} from '@nestjs/common';

import { CreatePostRequestDto } from './dto/request/create-post.request.dto';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { CreateCommentRequestDto } from './dto/request/create-comment.request.dto';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { FindPostsQuery } from './dto/query/find-posts.query.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { seconds, Throttle } from '@nestjs/throttler';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { HttpCache } from 'src/common/decorators/http-cache.decorator';
import { JwtOptionalGuard } from 'src/modules/auth/guards/jwt-optional.guard';
import { PostsQueryService } from './posts-query.service';
import { CommentsService } from './comments/comments.service';
import { PostLikesService } from './likes/post-likes.service';
import { PostCardResponseDto } from './dto/response/post-card.response.dto';
import { PostDetailResponseDto } from './dto/response/post-detail.response.dto';
import { CommentResponseDto } from './dto/response/comment.response.dto';

@ApiTags('Community')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsQueryService: PostsQueryService,
    private readonly commentsService: CommentsService,
    private readonly postLikesService: PostLikesService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: seconds(10), limit: 10 } })
  @UseInterceptors(
    FilesInterceptor('image', 5, {
      limits: { fileSize: 7 * 1024 * 1024 }, // 7MB
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            BaseException.badRequest(
              'Only JPEG, PNG, and WEBP files are allowed',
              ErrorCode.FILE_INVALID_TYPE,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  createPost(
    @CurrentUser() user: JwtUser,
    @Body()
    createPostDto: CreatePostRequestDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ): Promise<PostCardResponseDto> {
    return this.postsService.createPost(user.id, createPostDto, images);
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  findPosts(
    @Query() query: FindPostsQuery,
  ): Promise<{ posts: PostCardResponseDto[]; totalPages: number }> {
    return this.postsQueryService.findPosts(query);
  }

  @Get('region/:regionSlug')
  @ApiOperation({ summary: '지역별 게시글 조회' })
  findPostsByRegionSlug(
    @Param('regionSlug') regionSlug: string,
  ): Promise<PostCardResponseDto[]> {
    return this.postsQueryService.findPostsByRegionSlug(regionSlug);
  }

  @Get('best')
  @HttpCache({ maxAge: 60, sMaxAge: 300, swr: 300 })
  @ApiOperation({ summary: '베스트 게시글 조회' })
  findBestPosts(): Promise<PostCardResponseDto[]> {
    return this.postsQueryService.findBestPosts();
  }

  @Get(':postId')
  @UseGuards(JwtOptionalGuard)
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiBearerAuth('access-token')
  getPostDetail(
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user?: JwtUser,
  ): Promise<PostDetailResponseDto> {
    return this.postsQueryService.findPostById(postId, user?.id);
  }

  @Delete(':postId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiBearerAuth('access-token')
  deletePost(
    @CurrentUser() user: JwtUser,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.postsService.deletePost(user.id, postId);
  }

  @Post(':postId/view')
  @UseGuards(JwtOptionalGuard)
  @ApiOperation({ summary: '게시글 조회수 증가' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: seconds(10), limit: 10 } })
  incrementViewCount(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.postsService.incrementViewCount(postId);
  }

  @UseGuards(JwtAccessGuard)
  @Post(':postId/like')
  @ApiOperation({ summary: '게시글 좋아요 토글' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: seconds(10), limit: 10 } })
  toggleLikePost(
    @CurrentUser() user: JwtUser,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<{ likeCount: number; liked: boolean }> {
    return this.postLikesService.toggleLikePost(user.id, postId);
  }

  // comment 관련 API

  @UseGuards(JwtAccessGuard)
  @Post(':postId/comments')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: seconds(10), limit: 10 } })
  createComment(
    @CurrentUser() user: JwtUser,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentRequestDto,
  ): Promise<CommentResponseDto> {
    return this.commentsService.createComment(
      user.id,
      postId,
      createCommentDto,
    );
  }

  @Get(':postId/comments')
  @ApiOperation({ summary: '댓글 목록 조회' })
  getCommentsByPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<CommentResponseDto[]> {
    return this.commentsService.getCommentsByPost(postId);
  }

  @UseGuards(JwtAccessGuard)
  @Delete('comments/:commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiBearerAuth('access-token')
  deleteComment(
    @CurrentUser() user: JwtUser,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<{ ok: true }> {
    return this.commentsService.deleteComment(user.id, commentId);
  }
}
