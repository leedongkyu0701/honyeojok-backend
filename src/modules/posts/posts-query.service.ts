import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { FindPostsQuery } from './dto/query/find-posts.query.dto';
import { PostCardResponseDto } from './dto/response/post-card.response.dto';
import { PostDetailResponseDto } from './dto/response/post-detail.response.dto';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/post-like.entity';
import { PostType } from './enums/post-type.enum';
import { PostMapper } from './mappers/post.mapper';

@Injectable()
export class PostsQueryService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findPosts(
    query: FindPostsQuery,
  ): Promise<{ posts: PostCardResponseDto[]; totalPages: number }> {
    const page = Math.max(1, query.page ?? 1);
    const take = Math.min(10, Math.max(1, query.take ?? 10));
    const skip = (page - 1) * take;
    const { type, q: searchTerm, province } = query;

    const queryBuilder = this.postRepository
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

    return {
      posts: posts.map((post) => PostMapper.toCard(post)),
      totalPages: Math.ceil(total / take),
    };
  }

  async findPostsByRegionSlug(
    regionSlug: string,
  ): Promise<PostCardResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { region: regionSlug, isDeleted: false },
      relations: ['user', 'destination'],
      order: { likeCount: 'DESC', viewCount: 'DESC' },
      take: 3,
    });

    return posts.map((post) => PostMapper.toCard(post));
  }

  async findPostById(
    postId: number,
    userId?: number,
  ): Promise<PostDetailResponseDto> {
    const post = await this.postRepository.findOne({
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
      ? await this.postLikeRepository.exists({ where: { postId, userId } })
      : false;

    return PostMapper.toDetail(post, likedByMe);
  }

  async findBestPosts(): Promise<PostCardResponseDto[]> {
    const posts = await this.postRepository.find({
      relations: ['user', 'destination'],
      where: { isDeleted: false },
      order: { likeCount: 'DESC', viewCount: 'DESC' },
      take: 3,
    });

    return posts.map((post) => PostMapper.toCard(post));
  }

  async findByUserId(
    userId: number,
    page: number,
    take: number,
  ): Promise<{ posts: PostCardResponseDto[]; totalPages: number }> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const skip = (page - 1) * take;
    const [posts, total] = await this.postRepository.findAndCount({
      where: { user: { id: userId }, isDeleted: false },
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return {
      posts: posts.map((post) => PostMapper.toCard(post, user.nickName)),
      totalPages: Math.ceil(total / take),
    };
  }
}
