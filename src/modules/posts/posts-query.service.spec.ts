import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { PostsQueryService } from './posts-query.service';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/post-like.entity';
import { PostType } from './enums/post-type.enum';

describe('PostsQueryService', () => {
  let service: PostsQueryService;
  const queryBuilder = {
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    take: jest.fn(),
    skip: jest.fn(),
    andWhere: jest.fn(),
    getManyAndCount: jest.fn(),
  };
  const postRepository = {
    createQueryBuilder: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
  };
  const postLikeRepository = { exists: jest.fn() };
  const userRepository = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    Object.values(queryBuilder).forEach((mock) => {
      if (mock !== queryBuilder.getManyAndCount)
        mock.mockReturnValue(queryBuilder);
    });
    postRepository.createQueryBuilder.mockReturnValue(queryBuilder);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsQueryService,
        { provide: getRepositoryToken(Post), useValue: postRepository },
        { provide: getRepositoryToken(PostLike), useValue: postLikeRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();
    service = module.get<PostsQueryService>(PostsQueryService);
  });

  it('applies pagination, search filters, and the deleted-post exclusion', async () => {
    queryBuilder.getManyAndCount.mockResolvedValue([[], 7]);

    await expect(
      service.findPosts({
        page: 2,
        take: 3,
        type: PostType.REVIEW,
        q: '혼자',
        province: 'SEOUL' as never,
      }),
    ).resolves.toEqual({ posts: [], totalPages: 3 });

    expect(queryBuilder.where).toHaveBeenCalledWith(
      'post.isDeleted = :isDeleted',
      { isDeleted: false },
    );
    expect(queryBuilder.take).toHaveBeenCalledWith(3);
    expect(queryBuilder.skip).toHaveBeenCalledWith(3);
    expect(queryBuilder.andWhere).toHaveBeenCalledWith('post.type = :type', {
      type: PostType.REVIEW,
    });
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      'post.title ILIKE :searchTerm',
      { searchTerm: '%혼자%' },
    );
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      'destination.province = :province',
      { province: 'SEOUL' },
    );
  });

  it('keeps the best-post ordering policy', async () => {
    postRepository.find.mockResolvedValue([]);

    await service.findBestPosts();

    expect(postRepository.find).toHaveBeenCalledWith({
      relations: ['user', 'destination'],
      where: { isDeleted: false },
      order: { likeCount: 'DESC', viewCount: 'DESC' },
      take: 3,
    });
  });

  it('returns only the requested active user posts in creation order', async () => {
    userRepository.findOne.mockResolvedValue({ id: 7, nickName: '혼여족' });
    postRepository.findAndCount.mockResolvedValue([[], 9]);

    await expect(service.findByUserId(7, 2, 4)).resolves.toEqual({
      posts: [],
      totalPages: 3,
    });

    expect(postRepository.findAndCount).toHaveBeenCalledWith({
      where: { user: { id: 7 }, isDeleted: false },
      skip: 4,
      take: 4,
      order: { createdAt: 'DESC' },
    });
  });
});
