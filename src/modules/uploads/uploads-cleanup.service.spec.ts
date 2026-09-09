import { Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { MediaUpload } from './entities/media-upload.entity';
import { MediaUploadStatus } from './enums/media-upload-status.enum';
import { UploadsCleanupService } from './uploads-cleanup.service';

describe('UploadsCleanupService', () => {
  let service: UploadsCleanupService;
  let repository: {
    find: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let manager: {
    getRepository: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };
  let dataSource: { transaction: ReturnType<typeof vi.fn> };
  let r2Service: { deleteObject: ReturnType<typeof vi.fn> };
  let claimQueryBuilder: {
    setLock: ReturnType<typeof vi.fn>;
    where: ReturnType<typeof vi.fn>;
    getOne: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01T00:00:00.000Z'));
    vi.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);

    repository = { find: vi.fn(), delete: vi.fn() };
    claimQueryBuilder = {
      setLock: vi.fn(),
      where: vi.fn(),
      getOne: vi.fn(),
    };
    claimQueryBuilder.setLock.mockReturnValue(claimQueryBuilder);
    claimQueryBuilder.where.mockReturnValue(claimQueryBuilder);
    manager = { getRepository: vi.fn(), save: vi.fn() };
    manager.getRepository.mockReturnValue({
      createQueryBuilder: vi.fn().mockReturnValue(claimQueryBuilder),
    });
    dataSource = {
      transaction: vi.fn(
        (callback: (transactionManager: typeof manager) => unknown) =>
          callback(manager),
      ),
    };
    r2Service = { deleteObject: vi.fn() };
    service = new UploadsCleanupService(
      repository as unknown as Repository<MediaUpload>,
      dataSource as unknown as DataSource,
      r2Service as unknown as R2Service,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('skips an expired candidate that can no longer be claimed', async () => {
    repository.find.mockResolvedValue([createUpload()]);
    claimQueryBuilder.getOne.mockResolvedValue(null);

    await service.cleanupExpiredUploads();

    expect(claimQueryBuilder.setLock).toHaveBeenCalledWith('pessimistic_write');
    expect(r2Service.deleteObject).not.toHaveBeenCalled();
    expect(repository.delete).not.toHaveBeenCalled();
    expect(repository.find).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100, order: { expiresAt: 'ASC' } }),
    );
  });

  it('deletes both object variants and its claimed database row', async () => {
    const upload = createUpload({
      processedKey: 'images/posts/processed/upload-1.webp',
    });
    repository.find.mockResolvedValue([upload]);
    claimQueryBuilder.getOne.mockResolvedValue(upload);

    await service.cleanupExpiredUploads();

    expect(manager.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: upload.id,
        status: MediaUploadStatus.FAILED,
        failureCode: 'UPLOAD_EXPIRED',
      }),
    );
    expect(r2Service.deleteObject).toHaveBeenNthCalledWith(
      1,
      upload.originalKey,
    );
    expect(r2Service.deleteObject).toHaveBeenNthCalledWith(
      2,
      upload.processedKey,
    );
    expect(repository.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        id: upload.id,
        status: MediaUploadStatus.FAILED,
      }),
    );
  });

  it('deletes only the original object when no processed key exists', async () => {
    const upload = createUpload({ processedKey: null });
    repository.find.mockResolvedValue([upload]);
    claimQueryBuilder.getOne.mockResolvedValue(upload);

    await service.cleanupExpiredUploads();

    expect(r2Service.deleteObject).toHaveBeenCalledTimes(1);
    expect(r2Service.deleteObject).toHaveBeenCalledWith(upload.originalKey);
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });

  it('keeps processing later candidates when an R2 deletion fails', async () => {
    const first = createUpload({ id: 'upload-1' });
    const second = createUpload({ id: 'upload-2' });
    repository.find.mockResolvedValue([first, second]);
    claimQueryBuilder.getOne
      .mockResolvedValueOnce(first)
      .mockResolvedValueOnce(second);
    r2Service.deleteObject.mockRejectedValueOnce(new Error('R2 unavailable'));

    await service.cleanupExpiredUploads();

    expect(r2Service.deleteObject).toHaveBeenNthCalledWith(
      1,
      first.originalKey,
    );
    expect(r2Service.deleteObject).toHaveBeenNthCalledWith(
      2,
      second.originalKey,
    );
    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(
      expect.objectContaining({ id: second.id }),
    );
  });
});

function createUpload(overrides: Partial<MediaUpload> = {}): MediaUpload {
  return {
    id: 'upload-1',
    originalKey: 'images/posts/original/upload-1',
    processedKey: null,
    status: MediaUploadStatus.PENDING,
    expiresAt: new Date('2026-08-30T00:00:00.000Z'),
    attachedAt: null,
    ...overrides,
  } as MediaUpload;
}
