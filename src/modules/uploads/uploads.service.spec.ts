/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { Mock } from 'vitest';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { storageConfig } from 'src/config/storage.config';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { MediaUpload } from './entities/media-upload.entity';
import { MediaUploadStatus } from './enums/media-upload-status.enum';
import { UploadsService } from './uploads.service';

describe('UploadsService', () => {
  let service: UploadsService;
  let repository: {
    create: Mock;
    find: Mock;
  };
  let manager: {
    save: Mock;
    findOne: Mock;
    getRepository: Mock;
  };
  let r2Service: { createPresignedPutUrl: Mock; getPublicUrl: Mock };

  beforeEach(async () => {
    repository = {
      create: vi.fn((input) => input),
      find: vi.fn(),
    };
    manager = {
      save: vi.fn(),
      findOne: vi.fn(),
      getRepository: vi.fn(),
    };
    r2Service = {
      createPresignedPutUrl: vi.fn(),
      getPublicUrl: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsService,
        { provide: getRepositoryToken(MediaUpload), useValue: repository },
        {
          provide: DataSource,
          useValue: {
            transaction: async (callback: (value: typeof manager) => unknown) =>
              callback(manager),
          },
        },
        { provide: R2Service, useValue: r2Service },
        {
          provide: storageConfig.KEY,
          useValue: { imageUploadEnabled: true },
        },
      ],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates PENDING rows with exact original keys and does not persist signed URLs', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01T00:00:00.000Z'));
    r2Service.createPresignedPutUrl
      .mockResolvedValueOnce('https://signed.example/first')
      .mockResolvedValueOnce('https://signed.example/second');

    const result = await service.createUploadSessions(7, {
      files: [
        { contentType: 'image/jpeg', size: 1200 },
        { contentType: 'image/png', size: 2300 },
      ],
    });

    expect(result.uploads).toHaveLength(2);
    expect(result.uploads.map((upload) => upload.uploadUrl)).toEqual([
      'https://signed.example/first',
      'https://signed.example/second',
    ]);
    expect(result.uploads[0].expiresAt).toBe('2026-09-01T00:05:00.000Z');
    expect(manager.save).toHaveBeenCalledWith(
      MediaUpload,
      expect.arrayContaining([
        expect.objectContaining({
          userId: 7,
          status: MediaUploadStatus.PENDING,
          originalKey: expect.stringMatching(
            /^images\/posts\/original\/[0-9a-f-]+$/,
          ),
        }),
      ]),
    );
    const savedRows = manager.save.mock.calls[0][1] as Record<
      string,
      unknown
    >[];
    expect(savedRows.every((row) => !('uploadUrl' in row))).toBe(true);
  });

  it.each([
    [{ files: new Array(6).fill({ contentType: 'image/jpeg', size: 1 }) }],
    [{ files: [{ contentType: 'image/gif', size: 1 }] }],
    [{ files: [{ contentType: 'image/jpeg', size: 6 * 1024 * 1024 + 1 }] }],
  ])('rejects invalid presign file policies', async (dto) => {
    await expect(service.createUploadSessions(1, dto)).rejects.toMatchObject({
      code: expect.stringMatching(
        `${ErrorCode.FILE_TOO_MANY}|${ErrorCode.FILE_INVALID_TYPE}|${ErrorCode.FILE_TOO_LARGE}`,
      ),
    });
  });

  it('returns owned statuses in the requested order', async () => {
    repository.find.mockResolvedValue([
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: MediaUploadStatus.READY,
        failureCode: null,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440000',
        status: MediaUploadStatus.FAILED,
        failureCode: 'INVALID_IMAGE',
      },
    ]);

    const result = await service.findOwnedStatuses(3, [
      '660e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440000',
    ]);

    expect(result.uploads).toEqual([
      {
        uploadId: '660e8400-e29b-41d4-a716-446655440000',
        status: MediaUploadStatus.FAILED,
        failureCode: 'INVALID_IMAGE',
      },
      {
        uploadId: '550e8400-e29b-41d4-a716-446655440000',
        status: MediaUploadStatus.READY,
        failureCode: null,
      },
    ]);
    expect(repository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ userId: 3 }),
      }),
    );
  });

  it('transitions PENDING to PROCESSING and keeps duplicate callbacks idempotent', async () => {
    const upload = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      status: MediaUploadStatus.PENDING,
    } as MediaUpload;
    manager.findOne.mockResolvedValue(upload);

    await expect(service.markProcessing(upload.id)).resolves.toBe(
      MediaUploadStatus.PROCESSING,
    );
    expect(manager.save).toHaveBeenCalledWith(upload);

    manager.save.mockClear();
    await expect(service.markProcessing(upload.id)).resolves.toBe(
      MediaUploadStatus.PROCESSING,
    );
    expect(manager.save).not.toHaveBeenCalled();
  });

  it('does not let a late FAILED callback overwrite READY', async () => {
    const upload = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      status: MediaUploadStatus.READY,
      processedKey:
        'images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
    } as MediaUpload;
    manager.findOne.mockResolvedValue(upload);

    await expect(
      service.updateProcessingResult(upload.id, {
        status: MediaUploadStatus.FAILED,
        failureCode: 'INVALID_IMAGE',
      }),
    ).resolves.toBe(MediaUploadStatus.READY);
    expect(manager.save).not.toHaveBeenCalled();
  });

  it('records the server-derived processed key when processing reports READY', async () => {
    const upload = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      status: MediaUploadStatus.PROCESSING,
    } as MediaUpload;
    manager.findOne.mockResolvedValue(upload);

    await expect(
      service.updateProcessingResult(upload.id, {
        status: MediaUploadStatus.READY,
        sourceEtag: 'etag',
        width: 1280,
        height: 720,
        processedSize: 321000,
      }),
    ).resolves.toBe(MediaUploadStatus.READY);

    expect(upload).toMatchObject({
      status: MediaUploadStatus.READY,
      processedKey:
        'images/posts/processed/550e8400-e29b-41d4-a716-446655440000.webp',
      sourceEtag: 'etag',
      width: 1280,
      height: 720,
      processedSize: 321000,
    });
  });
});
