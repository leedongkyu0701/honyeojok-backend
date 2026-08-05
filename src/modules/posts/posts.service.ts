import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { PostImage } from './entities/post-image.entity';
import { CreatePostRequestDto } from './dto/request/create-post.request.dto';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { DataSource } from 'typeorm';
import { CreateCommentRequestDto } from './dto/request/create-comment.request.dto';
import { Comment } from './entities/comment.entity';
import { PostType } from 'src/modules/posts/enums/post-type.enum';
import { PostCardResponseDto } from './dto/response/post-card.response.dto';
import { PostDetailResponseDto } from './dto/response/post-detail.response.dto';
import { PostLike } from './entities/post-like.entity';
import { ConfigService } from '@nestjs/config';
import { FindPostsQuery } from './dto/query/find-posts.query.dto';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { randomUUID } from 'crypto';
import { processImageBuffer } from 'src/infrastructure/media/image-processor.util';
import { CommentResponseDto } from './dto/response/comment.response.dto';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { Logger } from '@nestjs/common';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(PostLike)
    private readonly postLikeRepo: Repository<PostLike>,
    private readonly dataSource: DataSource,
    private readonly r2Service: R2Service,
    private readonly configService: ConfigService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostRequestDto,
    images?: Express.Multer.File[],
  ): Promise<PostCardResponseDto> {
    const uploadedKeys: string[] = []; // 업로드된 이미지 키 추적 배열 (r2 롤백용)

    if (this.configService.getOrThrow('IMAGE_UPLOAD_ENABLED') !== 'true') {
      throw BaseException.serviceUnavailable('Image uploads are disabled');
    }

    try {
      return this.dataSource.transaction(async (manager) => {
        const user = await manager.findOne(User, {
          where: { id: userId },
        });
        if (!user) {
          throw BaseException.notFound(
            'User not found',
            ErrorCode.RESOURCE_NOT_FOUND,
          );
        }
        let destination: Destination | undefined;
        if (createPostDto.type === PostType.REVIEW) {
          if (
            createPostDto.rating === undefined ||
            createPostDto.rating < 1 ||
            createPostDto.rating > 5
          ) {
            throw BaseException.badRequest(
              'Rating must be between 1 and 5',
              ErrorCode.VALIDATION_FAILED,
            );
          }
        }
        if (
          createPostDto.type === PostType.REVIEW &&
          createPostDto.regionSlug
        ) {
          const find = await manager.findOne(Destination, {
            where: { slug: createPostDto.regionSlug },
          });
          if (!find) {
            throw BaseException.notFound(
              'Destination not found',
              ErrorCode.RESOURCE_NOT_FOUND,
            );
          }
          destination = find;
        }

        const post = manager.create(Post, {
          title: createPostDto.title,
          content: createPostDto.content,
          rating: createPostDto.rating,
          destination: destination,
          type: createPostDto.type,
          region: createPostDto.regionSlug,
          user,
          likeCount: 0,
          viewCount: 0,
        });
        await manager.save(post);

        if (images && images.length > 0) {
          const postImages: PostImage[] = [];

          if (images.length > 5) {
            throw BaseException.badRequest(
              'Maximum 5 images are allowed',
              ErrorCode.FILE_TOO_MANY,
            );
          }

          let thumbnailUrl: string | null = null;
          const captions = createPostDto.captions || [];

          if (captions.length > images.length) {
            throw BaseException.badRequest(
              'Captions count cannot exceed images count',
              ErrorCode.VALIDATION_FAILED,
            );
          }

          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const uniqueKey = `posts/${post.id}/${randomUUID()}.webp`;
            const buffer = await processImageBuffer(image.buffer, 'REVIEW');
            const imageUrl = await this.r2Service.uploadImage(
              uniqueKey,
              buffer,
            );

            uploadedKeys.push(uniqueKey);

            if (i === 0) {
              thumbnailUrl = imageUrl;
            }

            const postImage = manager.create(PostImage, {
              imageUrl: imageUrl,
              post,
              caption: captions[i]?.trim(),
              imgOrder: i,
            });
            postImages.push(postImage);
          }

          await manager.save(postImages);
          if (thumbnailUrl) {
            post.thumbnailUrl = thumbnailUrl;
            await manager.save(post);
          }
        }

        return {
          id: post.id,
          title: post.title,
          region: post.region,
          createdAt: post.createdAt,
          nickName: post.user.nickName ?? '탈퇴한 혼여족',
          type: post.type,
          likeCount: post.likeCount,
          viewCount: post.viewCount,
          thumbnailUrl: post.thumbnailUrl,
        };
      });
    } catch (error) {
      await this.rollbackImages(uploadedKeys);
      throw error;
    }
  }

  async deletePost(userId: number, postId: number): Promise<void> {
    const post = await this.postRepo.findOne({
      where: { id: postId, isDeleted: false },
      relations: ['images', 'user'],
    });

    if (!post)
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );

    if (post.user.id !== userId) {
      throw BaseException.forbidden('Forbidden', ErrorCode.AUTH_FORBIDDEN);
    }

    post.isDeleted = true;
    await this.postRepo.save(post);

    await Promise.allSettled(
      post.images.map((img) =>
        this.r2Service.deleteImage(
          this.r2Service.extractKeyFromUrl(img.imageUrl),
        ),
      ),
    );
  }

  private async rollbackImages(keys: string[]) {
    await Promise.all(
      keys.map(async (key) => {
        try {
          await this.r2Service.deleteImage(key);
        } catch (err) {
          this.logger.warn(
            `rollbackImages failed : could not delete image with key ${key}`,
            err,
          );
        }
      }),
    );
  }

  async findPosts(
    query: FindPostsQuery,
  ): Promise<{ posts: PostCardResponseDto[]; totalPages: number }> {
    const page = Math.max(1, query.page ?? 1);
    const take = Math.min(10, Math.max(1, query.take ?? 10));
    const skip = (page - 1) * take;
    const { type, q: searchTerm, province } = query;

    const queryBuilder = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.destination', 'destination')
      .where('post.isDeleted = :isDeleted', { isDeleted: false })
      .orderBy('post.createdAt', 'DESC')
      .take(take)
      .skip(skip);

    if (type) {
      queryBuilder.andWhere('post.type = :type', { type });
    }

    if (searchTerm) {
      queryBuilder.andWhere('post.title ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    if (province && type === PostType.REVIEW) {
      queryBuilder.andWhere('destination.province = :province', { province });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      regionName: post.destination?.name ?? undefined,
      type: post.type,
      createdAt: post.createdAt,
      nickName: post.user.nickName ?? '탈퇴한 혼여족',
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      thumbnailUrl: post.thumbnailUrl,
    }));
    return { posts: data, totalPages: Math.ceil(total / take) };
  }

  async findPostsByRegionSlug(
    regionSlug: string,
  ): Promise<PostCardResponseDto[]> {
    const posts = await this.postRepo.find({
      where: { region: regionSlug, isDeleted: false },
      relations: ['user', 'destination'],
      order: { likeCount: 'DESC', viewCount: 'DESC' },
      take: 3,
    });

    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      regionName: post.destination?.name ?? undefined,
      createdAt: post.createdAt,
      nickName: post.user.nickName ?? '탈퇴한 혼여족',
      likeCount: post.likeCount,
      type: post.type,
      viewCount: post.viewCount,
      thumbnailUrl: post.thumbnailUrl,
    }));
    return data;
  }

  async findPostById(
    postId: number,
    userId?: number,
  ): Promise<PostDetailResponseDto> {
    const post = await this.postRepo.findOne({
      where: { id: postId, isDeleted: false },
      relations: ['user', 'images', 'destination'],
    });

    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const likedByMe = userId
      ? await this.postLikeRepo.exists({
          where: { postId, userId },
        })
      : false;

    return {
      id: post.id,
      title: post.title,
      region: post.region,
      regionName: post.destination?.name ?? undefined,
      createdAt: post.createdAt,
      nickName: post.user.nickName ?? '탈퇴한 혼여족',
      content: post.content,
      type: post.type,
      rating: post.rating,
      likeCount: post.likeCount,
      likedByMe,
      images:
        post.images
          ?.sort((a, b) => a.imgOrder - b.imgOrder)
          .map((img) => ({
            url: img.imageUrl,
            caption: img.caption ?? null,
          })) ?? [],
      viewCount: post.viewCount,
    };
  }

  async incrementViewCount(postId: number): Promise<void> {
    await this.postRepo.increment(
      { id: postId, isDeleted: false },
      'viewCount',
      1,
    );
  }

  async findBestPosts(): Promise<PostCardResponseDto[]> {
    const posts = await this.postRepo.find({
      relations: ['user', 'destination'],
      where: { isDeleted: false },
      order: { likeCount: 'DESC', viewCount: 'DESC' },
      take: 3,
    });
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      type: post.type,
      createdAt: post.createdAt,
      nickName: post.user.nickName ?? '탈퇴한 혼여족',
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      thumbnailUrl: post.thumbnailUrl,
      regionName: post.destination?.name ?? undefined,
    }));
  }

  async createComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentRequestDto,
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const post = await this.postRepo.findOne({
      where: { id: postId, isDeleted: false },
    });
    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const content = createCommentDto.content.trim();
    if (content.length === 0) {
      throw BaseException.badRequest(
        'Comment content cannot be empty',
        ErrorCode.BAD_REQUEST,
      );
    }

    const parentId = createCommentDto.parentId ?? null;

    if (parentId !== null) {
      const parent = await this.commentRepo.findOne({
        where: { id: parentId, postId }, // 부모 댓글이 같은 게시글에 속하는지 확인
        select: ['id', 'postId', 'parentId', 'isDeleted'],
      });

      if (!parent) {
        throw BaseException.notFound(
          'Parent comment not found in this post',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      if (parent.isDeleted) {
        throw BaseException.badRequest(
          'Cannot reply to a deleted comment',
          ErrorCode.BAD_REQUEST,
        );
      }

      if (parent.parentId !== null) {
        throw BaseException.badRequest(
          '최상위 댓글의 답글을 눌러 답글을 달아주세요',
          ErrorCode.BAD_REQUEST,
        );
      }
    }
    const comment = this.commentRepo.create({
      content,
      parentId,
      userId,
      postId,
      isDeleted: false,
    });
    await this.commentRepo.save(comment);
    return {
      id: comment.id,
      content: comment.content,
      isDeleted: comment.isDeleted,
      createdAt: comment.createdAt,
      parentId: comment.parentId,
      postId: comment.postId,
      userId: comment.userId,
      user: {
        id: user.id,
        nickName: user.nickName ?? '탈퇴한 혼여족',
      },
      children: [],
    };
  }

  async getCommentsByPost(postId: number): Promise<CommentResponseDto[]> {
    const post = await this.postRepo.findOne({
      where: { id: postId, isDeleted: false },
    });
    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    // 1) 해당 post의 댓글 전부 가져오기
    const rows = await this.commentRepo.find({
      where: { postId },
      order: { createdAt: 'ASC' },
      relations: { user: true },
      select: {
        id: true,
        content: true,
        isDeleted: true,
        createdAt: true,
        parentId: true,
        userId: true,
        user: { id: true, nickName: true },
      },
    });

    // 2) 트리(최상위 + children)로 변환
    const byId = new Map<number, CommentResponseDto>();
    for (const c of rows) {
      byId.set(c.id, {
        id: c.id,
        content: c.isDeleted ? '삭제된 댓글입니다.' : c.content,
        isDeleted: c.isDeleted,
        createdAt: c.createdAt,
        parentId: c.parentId ?? null,
        postId: postId,
        userId: c.userId ?? null,
        user: {
          id: c.user?.id ?? c.userId,
          nickName: c.user?.nickName ?? '탈퇴한 혼여족',
        },
        children: [],
      });
    }

    const roots: CommentResponseDto[] = [];
    for (const item of byId.values()) {
      if (item.parentId !== null) {
        const parent = byId.get(item.parentId);
        if (parent) parent.children.push(item);
      } else {
        roots.push(item);
      }
    }

    return roots;
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw BaseException.notFound(
        'Comment not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    if (comment.userId !== userId) {
      throw BaseException.forbidden(
        'You are not the author of this comment',
        ErrorCode.AUTH_FORBIDDEN,
      );
    }

    await this.commentRepo.update(commentId, { isDeleted: true, content: '' });

    return { ok: true };
  }

  async toggleLikePost(
    userId: number,
    postId: number,
  ): Promise<{ likeCount: number; liked: boolean }> {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(Post, {
        where: { id: postId, isDeleted: false },
      });
      if (!post) {
        throw BaseException.notFound(
          'Post not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const user = await manager.findOne(User, {
        where: { id: userId },
      });
      if (!user) {
        throw BaseException.notFound(
          'User not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const existingLike = await manager.exists(PostLike, {
        where: { postId, userId },
      });

      if (existingLike) {
        await manager.delete(PostLike, { postId, userId });
        await manager.decrement(Post, { id: postId }, 'likeCount', 1);
        const updatedPost = await manager.findOne(Post, {
          where: { id: postId, isDeleted: false },
        });
        return { likeCount: updatedPost!.likeCount, liked: false };
      }

      const like = manager.create(PostLike, {
        post,
        user,
      });

      await manager.save(like);

      await manager.increment(Post, { id: postId }, 'likeCount', 1);

      const updatedPost = await manager.findOne(Post, {
        where: { id: postId, isDeleted: false },
      });
      return { likeCount: updatedPost!.likeCount, liked: true };
    });
  }
}
