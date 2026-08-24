import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { BookmarksQueryService } from './bookmarks-query.service';
import { Bookmark } from './entities/bookmark.entity';

describe('BookmarksQueryService', () => {
  let service: BookmarksQueryService;
  const queryBuilder = {
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    skip: jest.fn(),
    take: jest.fn(),
    getManyAndCount: jest.fn(),
  };
  const bookmarkRepository = { createQueryBuilder: jest.fn() };
  const userRepository = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    Object.values(queryBuilder).forEach((mock) => {
      if (mock !== queryBuilder.getManyAndCount)
        mock.mockReturnValue(queryBuilder);
    });
    bookmarkRepository.createQueryBuilder.mockReturnValue(queryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarksQueryService,
        { provide: getRepositoryToken(Bookmark), useValue: bookmarkRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();
    service = module.get<BookmarksQueryService>(BookmarksQueryService);
  });

  it('keeps bookmark ordering, pagination, and trip-route card output', async () => {
    userRepository.findOne.mockResolvedValue({ id: 1 });
    queryBuilder.getManyAndCount.mockResolvedValue([
      {
        tripRoute: {
          id: 5,
          slug: 'seoul-day-one',
          title: '서울 혼자 여행',
          summary: '요약',
          days: 1,
          bookmarkCount: 3,
          destination: { slug: 'seoul' },
        },
      },
    ]);
    queryBuilder.getManyAndCount.mockResolvedValueOnce([
      [
        {
          tripRoute: {
            id: 5,
            slug: 'seoul-day-one',
            title: '서울 혼자 여행',
            summary: '요약',
            days: 1,
            bookmarkCount: 3,
            destination: { slug: 'seoul' },
          },
        },
      ],
      9,
    ]);

    await expect(service.findByUserId(1, 2, 4)).resolves.toEqual({
      tripRoutes: [
        {
          id: 5,
          slug: 'seoul-day-one',
          title: '서울 혼자 여행',
          summary: '요약',
          days: 1,
          regionSlug: 'seoul',
          bookmarkCount: 3,
        },
      ],
      totalPages: 3,
    });

    expect(queryBuilder.orderBy).toHaveBeenCalledWith(
      'bookmark.createdAt',
      'DESC',
    );
    expect(queryBuilder.skip).toHaveBeenCalledWith(4);
    expect(queryBuilder.take).toHaveBeenCalledWith(4);
  });
});
