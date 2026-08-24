import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { CreatePostRequestDto } from './dto/request/create-post.request.dto';
import { PostCardResponseDto } from './dto/response/post-card.response.dto';
import { PostImage } from './entities/post-image.entity';
import { Post } from './entities/post.entity';
import { PostType } from './enums/post-type.enum';
import { PostMapper } from './mappers/post.mapper';
import { PostMediaService } from './post-media.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
    private readonly postMediaService: PostMediaService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostRequestDto,
    images?: Express.Multer.File[],
  ): Promise<PostCardResponseDto> {
    this.postMediaService.assertUploadsEnabled();

    // Sharp 작업은 DB connection을 점유하기 전에 끝낸다. R2 key에 post ID가
    // 포함되므로 업로드와 PostImage 저장은 아래 원자적 트랜잭션에서 유지한다.
    const preparedImages = await this.postMediaService.prepareImages(
      images,
      createPostDto.captions,
    );
    const uploadedKeys: string[] = [];

    try {
      return await this.dataSource.transaction(async (manager) => {
        const user = await manager.findOne(User, { where: { id: userId } });
        if (!user) {
          throw BaseException.notFound(
            'User not found',
            ErrorCode.RESOURCE_NOT_FOUND,
          );
        }

        let destination: Destination | undefined;
        if (
          createPostDto.type === PostType.REVIEW &&
          (createPostDto.rating === undefined ||
            createPostDto.rating < 1 ||
            createPostDto.rating > 5)
        ) {
          throw BaseException.badRequest(
            'Rating must be between 1 and 5',
            ErrorCode.VALIDATION_FAILED,
          );
        }

        if (
          createPostDto.type === PostType.REVIEW &&
          createPostDto.regionSlug
        ) {
          const foundDestination = await manager.findOne(Destination, {
            where: { slug: createPostDto.regionSlug },
          });
          if (!foundDestination) {
            throw BaseException.notFound(
              'Destination not found',
              ErrorCode.RESOURCE_NOT_FOUND,
            );
          }
          destination = foundDestination;
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
          viewCount: 0,
        });
        await manager.save(post);

        const uploadedImages = await this.postMediaService.uploadImages(
          post.id,
          preparedImages,
        );
        uploadedKeys.push(...uploadedImages.map((image) => image.key));

        if (uploadedImages.length > 0) {
          const postImages = uploadedImages.map((image) =>
            manager.create(PostImage, {
              imageUrl: image.imageUrl,
              post,
              caption: image.caption,
              imgOrder: image.imgOrder,
            }),
          );
          await manager.save(postImages);

          post.thumbnailUrl = uploadedImages[0].imageUrl;
          await manager.save(post);
        }

        return PostMapper.toCard(post, undefined, false);
      });
    } catch (error) {
      await this.postMediaService.rollbackImages(uploadedKeys);
      throw error;
    }
  }

  async deletePost(userId: number, postId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId, isDeleted: false },
      relations: ['images', 'user'],
    });

    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    if (post.user.id !== userId) {
      throw BaseException.forbidden('Forbidden', ErrorCode.AUTH_FORBIDDEN);
    }

    post.isDeleted = true;
    await this.postRepository.save(post);
    await this.postMediaService.deleteImages(
      post.images.map((image) => image.imageUrl),
    );
  }

  async incrementViewCount(postId: number): Promise<void> {
    await this.postRepository.increment(
      { id: postId, isDeleted: false },
      'viewCount',
      1,
    );
  }
}
