import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  const postRepository = { findOne: jest.fn() };
  const commentRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
  const userRepository = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Post), useValue: postRepository },
        { provide: getRepositoryToken(Comment), useValue: commentRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();
    service = module.get<CommentsService>(CommentsService);
  });

  it('rejects a comment for a missing post', async () => {
    userRepository.findOne.mockResolvedValue({ id: 1 });
    postRepository.findOne.mockResolvedValue(null);

    await expect(
      service.createComment(1, 10, { content: '댓글' }),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
  });

  it.each([
    ['missing parent', null, ErrorCode.RESOURCE_NOT_FOUND],
    [
      'deleted parent',
      { id: 2, isDeleted: true, parentId: null },
      ErrorCode.BAD_REQUEST,
    ],
    [
      'nested parent',
      { id: 2, isDeleted: false, parentId: 1 },
      ErrorCode.BAD_REQUEST,
    ],
  ])('rejects a reply with a %s', async (_label, parent, errorCode) => {
    userRepository.findOne.mockResolvedValue({ id: 1 });
    postRepository.findOne.mockResolvedValue({ id: 10, isDeleted: false });
    commentRepository.findOne.mockResolvedValue(parent);

    await expect(
      service.createComment(1, 10, { content: '답글', parentId: 2 }),
    ).rejects.toMatchObject({ code: errorCode });
  });
});
