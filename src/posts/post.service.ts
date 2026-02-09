import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { PostImage } from './post-image.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { Destination } from 'src/destinations/destination.entity';
import { DataSource } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from './comment.entity';
import { PostType } from 'src/types/post';
import { PostCardResponse } from './dtos/post-card.response';
import { PostDetailResponse } from './dtos/post-detail.response';
import { PostLike } from './post_like.entity';
import { ConfigService } from '@nestjs/config';

import { R2Service } from 'src/common/r2/r2.service';
import { randomUUID } from 'crypto';
import { processImageBuffer } from 'src/common/process-image';
import { CommentResponseDto } from './dtos/comment.response';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly r2Service: R2Service,
    @InjectRepository(PostLike)
    private readonly postLikeRepo: Repository<PostLike>,
    private readonly configService: ConfigService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
    images?: Express.Multer.File[],
  ): Promise<PostCardResponse> {
    const uploadedKeys: string[] = []; // 업로드된 이미지 키를 추적하기 위한 배열(나중에 삭제할 때 사용)

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
          destination,
          type: createPostDto.type,
          region: createPostDto.regionSlug,
          user,
          likeCount: 0,
        });
        await manager.save(post);

        // 이미지가 있다면 R2에 업로드 및 PostImage 엔티티 생성
        if (images && images.length > 0) {
          const postImages: PostImage[] = [];

          if (images.length > 5) {
            throw BaseException.badRequest(
              'Maximum 5 images are allowed',
              ErrorCode.FILE_TOO_MANY,
            );
          }

          let thumbnailUrl: string | null = null;

          for (const image of images) {
            const uniqueKey = `posts/${post.id}/${randomUUID()}.webp`;
            const buffer = await processImageBuffer(image.buffer, 'REVIEW');
            const imageUrl = await this.r2Service.uploadImage(
              uniqueKey,
              buffer,
            );

            uploadedKeys.push(uniqueKey); // 업로드된 이미지 키 저장

            if (!thumbnailUrl) {
              thumbnailUrl = imageUrl; // 첫 번째 이미지를 썸네일로 설정
            }

            const postImage = manager.create(PostImage, {
              url: imageUrl,
              post,
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
          nickName: post.user.nickName,
          type: post.type,
          likeCount: post.likeCount,
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

    // 1️⃣ R2 이미지 삭제
    await Promise.allSettled(
      post.images.map((img) =>
        this.r2Service.deleteImage(this.r2Service.extractKeyFromUrl(img.url)),
      ),
    );
  }

  private async rollbackImages(keys: string[]) {
    await Promise.all(
      keys.map(async (key) => {
        try {
          await this.r2Service.deleteImage(key);
        } catch (err) {
          console.error(`Failed to delete image with key ${key}:`, err);
        }
      }),
    );
  }

  async findPosts(
    page: number,
    type?: PostType,
    searchTerm?: string,
  ): Promise<{ posts: PostCardResponse[]; totalPages: number }> {
    const take = 10;
    const skip = (page - 1) * take;

    const queryBuilder = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.images', 'images')
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

    const [posts, total] = await queryBuilder.getManyAndCount();

    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      type: post.type,
      createdAt: post.createdAt,
      nickName: post.user.nickName,
      likeCount: post.likeCount,
      thumbnailUrl: post.thumbnailUrl,
    }));
    return { posts: data, totalPages: Math.ceil(total / take) };
  }

  async findPostsByRegionSlug(regionSlug: string): Promise<PostCardResponse[]> {
    const posts = await this.postRepo.find({
      where: { region: regionSlug, isDeleted: false },
      relations: ['user', 'images'],
      order: { createdAt: 'DESC' },
      take: 3,
    });

    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      createdAt: post.createdAt,
      nickName: post.user.nickName,
      likeCount: post.likeCount,
      type: post.type,
      thumbnailUrl: post.thumbnailUrl,
    }));
    return data;
  }

  async findPostById(
    postId: number,
    userId: number,
  ): Promise<PostDetailResponse> {
    const post = await this.postRepo.findOne({
      where: { id: postId, isDeleted: false },
      relations: ['user', 'images'],
    });

    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    let likedByMe = false;
    const existingLike = await this.postLikeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
      relations: ['post', 'user'],
    });

    if (existingLike) {
      likedByMe = true;
    }

    return {
      id: post.id,
      title: post.title,
      region: post.region,
      createdAt: post.createdAt,
      nickName: post.user.nickName,
      content: post.content,
      type: post.type,
      rating: post.rating,
      likeCount: post.likeCount,
      likedByMe,
      imageUrls: post.images?.map((image) => image.url),
    };
  }

  async findBestPosts(): Promise<PostCardResponse[]> {
    const posts = await this.postRepo.find({
      relations: ['user', 'images'],
      where: { isDeleted: false },
      order: { likeCount: 'DESC' },
      take: 3,
    });
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      type: post.type,
      createdAt: post.createdAt,
      nickName: post.user.nickName,
      likeCount: post.likeCount,
      thumbnailUrl: post.thumbnailUrl,
    }));
  }

  async createComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
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
        where: { id: parentId, postId },
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
    return this.commentRepo.save(comment);
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
    // 1) 해당 post의 댓글 전부 가져오기 (user join은 닉네임 필요할 때만)
    const rows = await this.commentRepo.find({
      where: { postId },
      order: { createdAt: 'ASC' },
      relations: { user: true }, // 닉네임 보여주려면 필요
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
        userId: c.userId,
        user: {
          id: c.user?.id ?? c.userId,
          nickName: c.user?.nickName ?? 'unknown',
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

      const existingLike = await manager.findOne(PostLike, {
        where: { post: { id: postId }, user: { id: userId } },
        relations: ['post', 'user'],
      });

      if (existingLike) {
        // 이미 좋아요가 눌러져 있으면 좋아요 취소
        await manager.remove(existingLike);
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
