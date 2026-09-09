import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { PostLikesService } from './post-likes.service';
import { Post } from '../entities/post.entity';
import { PostLike } from '../entities/post-like.entity';

describe('PostLikesService', () => {
  let service: PostLikesService;
  const manager = {
    findOne: vi.fn(),
    exists: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    increment: vi.fn(),
    delete: vi.fn(),
    decrement: vi.fn(),
  };
  const dataSource = { transaction: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();
    dataSource.transaction.mockImplementation(
      (callback: (entityManager: typeof manager) => Promise<unknown>) =>
        callback(manager),
    );
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostLikesService,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();
    service = module.get<PostLikesService>(PostLikesService);
  });

  it('creates one like and increments the count in the same transaction', async () => {
    const post = { id: 10, likeCount: 0 };
    manager.findOne
      .mockResolvedValueOnce(post)
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce({ id: 10, likeCount: 1 });
    manager.exists.mockResolvedValue(false);
    manager.create.mockReturnValue({ id: 100 });

    await expect(service.toggleLikePost(1, 10)).resolves.toEqual({
      liked: true,
      likeCount: 1,
    });

    expect(manager.findOne).toHaveBeenNthCalledWith(1, Post, {
      where: { id: 10, isDeleted: false },
      lock: { mode: 'pessimistic_write' },
    });
    expect(manager.create).toHaveBeenCalledWith(PostLike, {
      post,
      user: { id: 1 },
    });
    expect(manager.increment).toHaveBeenCalledWith(
      Post,
      { id: 10 },
      'likeCount',
      1,
    );
  });

  it('removes an existing like and decrements the same counter', async () => {
    manager.findOne
      .mockResolvedValueOnce({ id: 10, likeCount: 1 })
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce({ id: 10, likeCount: 0 });
    manager.exists.mockResolvedValue(true);

    await expect(service.toggleLikePost(1, 10)).resolves.toEqual({
      liked: false,
      likeCount: 0,
    });

    expect(manager.delete).toHaveBeenCalledWith(PostLike, {
      postId: 10,
      userId: 1,
    });
    expect(manager.decrement).toHaveBeenCalledWith(
      Post,
      { id: 10 },
      'likeCount',
      1,
    );
  });

  it('rejects a like for a post that is missing or deleted', async () => {
    manager.findOne.mockResolvedValueOnce(null);

    await expect(service.toggleLikePost(1, 10)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
    expect(manager.exists).not.toHaveBeenCalled();
  });

  it('rejects a like from a user that no longer exists', async () => {
    manager.findOne
      .mockResolvedValueOnce({ id: 10, likeCount: 0 })
      .mockResolvedValueOnce(null);

    await expect(service.toggleLikePost(1, 10)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
    expect(manager.exists).not.toHaveBeenCalled();
  });
});
