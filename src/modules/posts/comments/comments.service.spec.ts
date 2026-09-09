import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  const postRepository = { findOne: vi.fn() };
  const commentRepository = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    update: vi.fn(),
  };
  const userRepository = { findOne: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();
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

  it('rejects a comment from a user that no longer exists', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(
      service.createComment(1, 10, { content: '댓글' }),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
    expect(postRepository.findOne).not.toHaveBeenCalled();
  });

  it('rejects content that is empty after trimming', async () => {
    userRepository.findOne.mockResolvedValue({ id: 1 });
    postRepository.findOne.mockResolvedValue({ id: 10, isDeleted: false });

    await expect(
      service.createComment(1, 10, { content: '   ' }),
    ).rejects.toMatchObject({ code: ErrorCode.BAD_REQUEST });
    expect(commentRepository.create).not.toHaveBeenCalled();
  });

  it('creates a trimmed root comment and returns its public representation', async () => {
    const createdAt = new Date('2026-09-01T00:00:00.000Z');
    userRepository.findOne.mockResolvedValue({ id: 1, nickName: '혼여족' });
    postRepository.findOne.mockResolvedValue({ id: 10, isDeleted: false });
    commentRepository.create.mockReturnValue({
      id: 3,
      createdAt,
      content: '안녕하세요',
      isDeleted: false,
      parentId: null,
      postId: 10,
      userId: 1,
    });

    await expect(
      service.createComment(1, 10, { content: '  안녕하세요  ' }),
    ).resolves.toEqual({
      id: 3,
      content: '안녕하세요',
      isDeleted: false,
      createdAt,
      parentId: null,
      postId: 10,
      userId: 1,
      user: { id: 1, nickName: '혼여족' },
      children: [],
    });
    expect(commentRepository.create).toHaveBeenCalledWith({
      content: '안녕하세요',
      parentId: null,
      userId: 1,
      postId: 10,
      isDeleted: false,
    });
  });

  it('creates a reply only under a valid root comment', async () => {
    userRepository.findOne.mockResolvedValue({ id: 1, nickName: null });
    postRepository.findOne.mockResolvedValue({ id: 10, isDeleted: false });
    commentRepository.findOne.mockResolvedValue({
      id: 2,
      postId: 10,
      parentId: null,
      isDeleted: false,
    });
    commentRepository.create.mockReturnValue({
      id: 3,
      createdAt: new Date('2026-09-01T00:00:00.000Z'),
      content: '답글',
      isDeleted: false,
      parentId: 2,
      postId: 10,
      userId: 1,
    });

    await service.createComment(1, 10, { content: '답글', parentId: 2 });

    expect(commentRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ parentId: 2, content: '답글' }),
    );
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

  it('builds a comment tree and masks deleted or withdrawn users', async () => {
    const createdAt = new Date('2026-09-01T00:00:00.000Z');
    postRepository.findOne.mockResolvedValue({ id: 10, isDeleted: false });
    commentRepository.find.mockResolvedValue([
      {
        id: 1,
        content: '원댓글',
        isDeleted: false,
        createdAt,
        parentId: null,
        userId: 5,
        user: { id: 5, nickName: '작성자' },
      },
      {
        id: 2,
        content: '숨겨질 원문',
        isDeleted: true,
        createdAt,
        parentId: 1,
        userId: 6,
        user: null,
      },
    ]);

    await expect(service.getCommentsByPost(10)).resolves.toEqual([
      {
        id: 1,
        content: '원댓글',
        isDeleted: false,
        createdAt,
        parentId: null,
        postId: 10,
        userId: 5,
        user: { id: 5, nickName: '작성자' },
        children: [
          {
            id: 2,
            content: '삭제된 댓글입니다.',
            isDeleted: true,
            createdAt,
            parentId: 1,
            postId: 10,
            userId: 6,
            user: { id: 6, nickName: '탈퇴한 혼여족' },
            children: [],
          },
        ],
      },
    ]);
  });

  it('rejects comment lookup for a missing post', async () => {
    postRepository.findOne.mockResolvedValue(null);

    await expect(service.getCommentsByPost(10)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
  });

  it.each([
    ['missing comment', null, ErrorCode.RESOURCE_NOT_FOUND],
    ['another user comment', { id: 2, userId: 9 }, ErrorCode.AUTH_FORBIDDEN],
  ])('rejects deletion of a %s', async (_label, comment, errorCode) => {
    commentRepository.findOne.mockResolvedValue(comment);

    await expect(service.deleteComment(1, 2)).rejects.toMatchObject({
      code: errorCode,
    });
    expect(commentRepository.update).not.toHaveBeenCalled();
  });

  it('soft-deletes a comment only for its author', async () => {
    commentRepository.findOne.mockResolvedValue({ id: 2, userId: 1 });

    await expect(service.deleteComment(1, 2)).resolves.toEqual({ ok: true });

    expect(commentRepository.update).toHaveBeenCalledWith(2, {
      isDeleted: true,
      content: '',
    });
  });
});
