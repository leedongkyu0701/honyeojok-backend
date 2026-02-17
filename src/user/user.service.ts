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
import { QueryFailedError } from 'typeorm';
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
    return this.userRepository.findOne({ where: { id } });
  }

  async findByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { provider, providerId, isDeleted: false },
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
      nickName: user.nickName,
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }

  async updateNickName(userId: number, newNickName: string) {
    const nickName = newNickName.trim();

    // 1. 기본 방어 (DTO 있어도 한 번 더)
    if (nickName.length < 2 || nickName.length > 12) {
      throw BaseException.badRequest(
        'NickName length must be 2~12',
        ErrorCode.BAD_REQUEST,
      );
    }

    // 2. 현재 유저 조회
    const me = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!me) {
      throw BaseException.badRequest('User not found', ErrorCode.BAD_REQUEST);
    }

    // 3. 같은 닉네임이면 그냥 성공 처리 (UX)
    if (me.nickName === nickName) {
      return { ok: true };
    }

    // 4. 다른 유저가 사용 중인지 체크 (삭제 유저 제외)
    const exists = await this.userRepository.findOne({
      where: { nickName, isDeleted: false },
    });

    if (exists && exists.id !== userId) {
      throw BaseException.conflict(
        'NickName already exists',
        ErrorCode.DUPLICATE_RESOURCE,
      );
    }

    // 5. 업데이트 + DB unique 에러 방어
    try {
      await this.userRepository.update(userId, { nickName });
    } catch (e) {
      // PostgreSQL unique_violation
      if (e instanceof QueryFailedError) {
        const driverErr = e.driverError as Record<string, unknown>;
        if (driverErr.code === '23505') {
          throw BaseException.conflict(
            'NickName already exists',
            ErrorCode.DUPLICATE_RESOURCE,
          );
        }
      }
      throw e;
    }

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
      nickName: user.nickName,
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
}
