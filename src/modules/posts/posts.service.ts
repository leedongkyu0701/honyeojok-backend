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
import { UploadsService } from 'src/modules/uploads/uploads.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
    private readonly uploadsService: UploadsService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostRequestDto,
  ): Promise<PostCardResponseDto> {
    return this.dataSource.transaction(async (manager) => {
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

      if (createPostDto.type === PostType.REVIEW && createPostDto.regionSlug) {
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

      const requestedImages = createPostDto.images ?? [];
      const uploads = await this.uploadsService.lockReadyUploadsForAttachment(
        manager,
        userId,
        requestedImages.map((image) => image.uploadId),
      );

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

      if (uploads.length > 0) {
        const postImages = uploads.map((upload, index) =>
          manager.create(PostImage, {
            imageUrl: this.uploadsService.getProcessedPublicUrl(upload),
            uploadId: upload.id,
            post,
            caption: requestedImages[index].caption?.trim() || undefined,
            imgOrder: index,
          }),
        );
        await manager.save(postImages);

        post.thumbnailUrl = postImages[0].imageUrl;
        await manager.save(post);
        await this.uploadsService.markAttached(manager, uploads);
      }

      return PostMapper.toCard(post, undefined, false);
    });
  }

  async deletePost(userId: number, postId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId, isDeleted: false },
      relations: ['user'],
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
  }

  async incrementViewCount(postId: number): Promise<void> {
    await this.postRepository.increment(
      { id: postId, isDeleted: false },
      'viewCount',
      1,
    );
  }
}
