import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { AuthProvider } from 'src/types/user';
import { Bookmark } from '../trip-routes/bookmark.entity';
import { UserProfileResponse } from './dtos/user-profile.response';
import { PostCardResponse } from 'src/posts/dtos/post-card.response';
import { Post } from 'src/posts/post.entity';
import { TripRoutesCardResponse } from 'src/trip-routes/dtos/trip-routes-card.response';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id, isDeleted: false } });
  }

  async findByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { provider, providerId, isDeleted: false },
    });
    return user;
  }

  async findDeletedByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { provider, providerId, isDeleted: true },
    });
  }

  async findByNickName(nickName: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { nickName, isDeleted: false },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async compareRefreshToken(
    plainToken: string,
    hashedToken: string,
  ): Promise<boolean> {
    return argon2.verify(hashedToken, plainToken);
  }

  async updateRefreshToken(
    userId: number,
    hashedRefreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async clearRefreshToken(userId: number): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  async getProfile(userId: number): Promise<UserProfileResponse | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    return {
      id: user.id,
      email: user.email ?? null,
      nickName: user.nickName ?? '탈퇴한 혼여족',
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }

  async updateNickName(userId: number, newNickName: string) {
    const nickName = newNickName.trim();

    if (nickName.length < 2 || nickName.length > 12) {
      throw BaseException.badRequest(
        'NickName length must be 2~12',
        ErrorCode.BAD_REQUEST,
      );
    }

    const me = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!me) {
      throw BaseException.badRequest('User not found', ErrorCode.BAD_REQUEST);
    }

    if (me.nickName === nickName) {
      return { ok: true };
    }

    const exists = await this.userRepository.findOne({
      where: { nickName, isDeleted: false },
    });

    if (exists && exists.id !== userId) {
      throw BaseException.conflict(
        'NickName already exists',
        ErrorCode.DUPLICATE_RESOURCE,
      );
    }

    await this.userRepository.update(userId, { nickName });

    return { ok: true };
  }

  async getUserPosts(userId: number, page: number, limit: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    const skip = (page - 1) * limit;
    const [posts, total] = await this.postRepository.findAndCount({
      where: { user: { id: userId }, isDeleted: false },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const postCards: PostCardResponse[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      region: post.region,
      nickName: user.nickName ?? '탈퇴한 혼여족',
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      thumbnailUrl: post.thumbnailUrl,
      type: post.type,
      createdAt: post.createdAt,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      posts: postCards,
      totalPages,
    };
  }

  async getUserBookmarks(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ tripRoutes: TripRoutesCardResponse[]; totalPages: number }> {
    const me = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!me)
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );

    const skip = (page - 1) * limit;
    const [bookmarks, total] = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tripRoute', 'route')
      .leftJoinAndSelect('route.destination', 'destination')
      .where('bookmark.userId = :userId', { userId })
      .orderBy('bookmark.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const tripRoutesCards = bookmarks.map((bookmark) => {
      const route = bookmark.tripRoute;
      return {
        id: route.id,
        slug: route.slug,
        title: route.title,
        summary: route.summary,
        days: route.days,
        regionSlug: route.destination.slug,
        bookmarkCount: route.bookmarkCount,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return {
      tripRoutes: tripRoutesCards,
      totalPages,
    };
  }

  async withdraw(userId: number): Promise<void> {
    await this.userRepository.update(userId, {
      isDeleted: true,
      refreshToken: null,
      email: null,
      nickName: null,
    });
  }
}
