import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, LessThan, Repository } from 'typeorm';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { MediaUpload } from './entities/media-upload.entity';
import { MediaUploadStatus } from './enums/media-upload-status.enum';
import { UPLOAD_CLEANUP_GRACE_PERIOD_MS } from './uploads.constants';

@Injectable()
export class UploadsCleanupService {
  private readonly logger = new Logger(UploadsCleanupService.name);

  constructor(
    @InjectRepository(MediaUpload)
    private readonly mediaUploadRepository: Repository<MediaUpload>,
    private readonly dataSource: DataSource,
    private readonly r2Service: R2Service,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredUploads(): Promise<void> {
    const startedAt = Date.now();
    const cutoff = new Date(Date.now() - UPLOAD_CLEANUP_GRACE_PERIOD_MS);
    const candidates = await this.mediaUploadRepository.find({
      where: {
        status: In([
          MediaUploadStatus.PENDING,
          MediaUploadStatus.PROCESSING,
          MediaUploadStatus.FAILED,
          MediaUploadStatus.READY,
        ]),
        expiresAt: LessThan(cutoff),
        attachedAt: IsNull(),
      },
      take: 100,
      order: { expiresAt: 'ASC' },
    });
    let deleted = 0;
    let failed = 0;

    for (const candidate of candidates) {
      const upload = await this.claimForCleanup(candidate.id, cutoff);
      if (!upload) continue;

      try {
        await this.r2Service.deleteObject(upload.originalKey);
        if (upload.processedKey) {
          await this.r2Service.deleteObject(upload.processedKey);
        }
        await this.mediaUploadRepository.delete({
          id: upload.id,
          status: MediaUploadStatus.FAILED,
          attachedAt: IsNull(),
        });
        deleted += 1;
      } catch (error) {
        failed += 1;
        this.logger.warn(
          `Upload cleanup failed for ${upload.id}: ${getErrorMessage(error)}`,
        );
      }
    }

    this.logger.log(
      `Upload cleanup completed: candidates=${candidates.length}, deleted=${deleted}, failed=${failed}, elapsedMs=${Date.now() - startedAt}`,
    );
  }

  private async claimForCleanup(
    uploadId: string,
    cutoff: Date,
  ): Promise<MediaUpload | null> {
    return this.dataSource.transaction(async (manager) => {
      const upload = await manager
        .getRepository(MediaUpload)
        .createQueryBuilder('upload')
        .setLock('pessimistic_write')
        .where('upload.id = :uploadId', { uploadId })
        .getOne();

      if (
        !upload ||
        upload.attachedAt ||
        upload.expiresAt >= cutoff ||
        ![
          MediaUploadStatus.PENDING,
          MediaUploadStatus.PROCESSING,
          MediaUploadStatus.FAILED,
          MediaUploadStatus.READY,
        ].includes(upload.status)
      ) {
        return null;
      }

      if (upload.status !== MediaUploadStatus.FAILED) {
        upload.status = MediaUploadStatus.FAILED;
        upload.failureCode = 'UPLOAD_EXPIRED';
        await manager.save(upload);
      }

      return upload;
    });
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
