import { Controller, Post } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Query,
  UploadedFiles,
} from '@nestjs/common/decorators';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import type { JwtUser } from 'src/types/user';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FindPostsQuery } from './dtos/find-posts.dto';

import { FilesInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { HttpCache } from 'src/common/decorators/http-cache.decorator';
import { JwtOptionalGuard } from 'src/auth/guards/jwt-optional.guard';

@ApiTags('Community')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: 10, limit: 10 } })
  @UseInterceptors(
    FilesInterceptor('image', 5, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.postService.createPost(user.id, createPostDto, images);
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  findPosts(@Query() query: FindPostsQuery) {
    console.log('find posts controller', query);
    return this.postService.findPosts(query);
  }

  @Get('region/:regionSlug')
  @ApiOperation({ summary: '지역별 게시글 조회' })
  findPostsByRegionSlug(@Param('regionSlug') regionSlug: string) {
    return this.postService.findPostsByRegionSlug(regionSlug);
  }

  @Get('best')
  @HttpCache({ maxAge: 60, sMaxAge: 300, swr: 60 })
  @ApiOperation({ summary: '베스트 게시글 조회' })
  findBestPosts() {
    return this.postService.findBestPosts();
  }

  @Get(':postId')
  @UseGuards(JwtOptionalGuard)
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiBearerAuth('access-token')
  getPostDetail(
    @Param('postId') postId: number,
    @CurrentUser() user?: JwtUser,
  ) {
    return this.postService.findPostById(postId, user?.id);
  }

  @Delete(':postId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiBearerAuth('access-token')
  deletePost(@CurrentUser() user: JwtUser, @Param('postId') postId: number) {
    return this.postService.deletePost(user.id, postId);
  }

  @Post(':postId/view')
  @UseGuards(JwtOptionalGuard)
  @ApiOperation({ summary: '게시글 조회수 증가' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: 10, limit: 10 } })
  incrementViewCount(@Param('postId') postId: number) {
    return this.postService.incrementViewCount(postId);
  }

  @UseGuards(JwtAccessGuard)
  @Post(':postId/like')
  @ApiOperation({ summary: '게시글 좋아요 토글' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: 10, limit: 10 } })
  toggleLikePost(
    @CurrentUser() user: JwtUser,
    @Param('postId') postId: number,
  ) {
    return this.postService.toggleLikePost(user.id, postId);
  }

  // comment 관련 API

  @UseGuards(JwtAccessGuard)
  @Post(':postId/comments')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiBearerAuth('access-token')
  @Throttle({ post: { ttl: 10, limit: 10 } })
  createComment(
    @CurrentUser() user: JwtUser,
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postService.createComment(user.id, postId, createCommentDto);
  }

  @Get(':postId/comments')
  @ApiOperation({ summary: '댓글 목록 조회' })
  getCommentsByPost(@Param('postId') postId: number) {
    return this.postService.getCommentsByPost(postId);
  }

  @UseGuards(JwtAccessGuard)
  @Delete('comments/:commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiBearerAuth('access-token')
  deleteComment(
    @CurrentUser() user: JwtUser,
    @Param('commentId') commentId: number,
  ) {
    console.log('delete comment controller', user.id, commentId);
    return this.postService.deleteComment(user.id, commentId);
  }
}
