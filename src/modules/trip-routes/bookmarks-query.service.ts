import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { TripRouteCardResponseDto } from './dto/response/trip-route-card.response.dto';
import { Bookmark } from './entities/bookmark.entity';
import { TripRouteMapper } from './mappers/trip-route.mapper';

@Injectable()
export class BookmarksQueryService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUserId(
    userId: number,
    page: number,
    take: number,
  ): Promise<{ tripRoutes: TripRouteCardResponseDto[]; totalPages: number }> {
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
    const [bookmarks, total] = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tripRoute', 'route')
      .leftJoinAndSelect('route.destination', 'destination')
      .where('bookmark.userId = :userId', { userId })
      .orderBy('bookmark.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      tripRoutes: bookmarks.map((bookmark) =>
        TripRouteMapper.toCard(bookmark.tripRoute),
      ),
      totalPages: Math.ceil(total / take),
    };
  }
}
