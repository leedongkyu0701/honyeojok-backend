/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { UploadsService } from 'src/modules/uploads/uploads.service';
import { User } from 'src/modules/users/entities/user.entity';
import { PostImage } from './entities/post-image.entity';
import { PostType } from './enums/post-type.enum';
import { MediaUpload } from 'src/modules/uploads/entities/media-upload.entity';

describe('PostsService', () => {
  let service: PostsService;
  let manager: { findOne: jest.Mock; create: jest.Mock; save: jest.Mock };
  let uploadsService: {
    lockReadyUploadsForAttachment: jest.Mock;
    getProcessedPublicUrl: jest.Mock;
    markAttached: jest.Mock;
  };

  beforeEach(async () => {
    manager = {
      findOne: jest.fn(async (entity) =>
        entity === User ? ({ id: 1, nickName: '혼여족' } as User) : null,
      ),
      create: jest.fn((entity, input) =>
        entity === Post ? ({ ...input, id: 100 } as Post) : input,
      ),
      save: jest.fn(),
    };
    uploadsService = {
      lockReadyUploadsForAttachment: jest.fn().mockResolvedValue([]),
      getProcessedPublicUrl: jest.fn(),
      markAttached: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getRepositoryToken(Post), useValue: {} },
        {
          provide: DataSource,
          useValue: {
            transaction: (callback: (value: typeof manager) => unknown) =>
              callback(manager),
          },
        },
        { provide: UploadsService, useValue: uploadsService },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('attaches READY uploads in request order and uses the first image as thumbnail', async () => {
    const upload = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      processedKey:
        'images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
    } as MediaUpload;
    uploadsService.lockReadyUploadsForAttachment.mockResolvedValue([upload]);
    uploadsService.getProcessedPublicUrl.mockReturnValue(
      'https://cdn.honyeojok.com/images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
    );

    await service.createPost(1, {
      title: '게시글',
      content: '내용',
      type: PostType.FREE,
      images: [{ uploadId: upload.id, caption: '첫 이미지' }],
    });

    expect(uploadsService.lockReadyUploadsForAttachment).toHaveBeenCalledWith(
      manager,
      1,
      [upload.id],
    );
    expect(manager.create).toHaveBeenCalledWith(
      PostImage,
      expect.objectContaining({
        uploadId: upload.id,
        caption: '첫 이미지',
        imgOrder: 0,
      }),
    );
    expect(uploadsService.markAttached).toHaveBeenCalledWith(manager, [upload]);
    expect(manager.save).toHaveBeenCalledWith(
      expect.objectContaining({
        thumbnailUrl:
          'https://cdn.honyeojok.com/images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
      }),
    );
  });

  it('creates posts without images and does not call storage-facing upload methods', async () => {
    await service.createPost(1, {
      title: '게시글',
      content: '내용',
      type: PostType.FREE,
    });

    expect(uploadsService.lockReadyUploadsForAttachment).toHaveBeenCalledWith(
      manager,
      1,
      [],
    );
    expect(uploadsService.getProcessedPublicUrl).not.toHaveBeenCalled();
    expect(uploadsService.markAttached).not.toHaveBeenCalled();
  });

  it('does not mark uploads ATTACHED when the transaction fails', async () => {
    const upload = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      processedKey:
        'images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
    } as MediaUpload;
    uploadsService.lockReadyUploadsForAttachment.mockResolvedValue([upload]);
    manager.save.mockRejectedValueOnce(new Error('database failed'));

    await expect(
      service.createPost(1, {
        title: '게시글',
        content: '내용',
        type: PostType.FREE,
        images: [{ uploadId: upload.id }],
      }),
    ).rejects.toThrow('database failed');
    expect(uploadsService.markAttached).not.toHaveBeenCalled();
  });
});
