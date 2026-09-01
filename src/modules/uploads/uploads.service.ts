import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { storageConfig } from 'src/config/storage.config';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { CreateUploadSessionsRequestDto } from './dto/request/create-upload-sessions.request.dto';
import { UpdateUploadProcessingResultRequestDto } from './dto/request/update-upload-processing-result.request.dto';
import { CreateUploadSessionsResponseDto } from './dto/response/create-upload-sessions.response.dto';
import { FindUploadStatusResponseDto } from './dto/response/upload-status.response.dto';
import { MediaUpload } from './entities/media-upload.entity';
import { MediaUploadStatus } from './enums/media-upload-status.enum';
import { POST_IMAGE_UPLOAD_POLICY } from './uploads.constants';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(MediaUpload)
    private readonly mediaUploadRepository: Repository<MediaUpload>,
    private readonly dataSource: DataSource,
    private readonly r2Service: R2Service,
    @Inject(storageConfig.KEY)
    private readonly config: ConfigType<typeof storageConfig>,
  ) {}

  assertUploadsEnabled(): void {
    if (!this.config.imageUploadEnabled) {
      throw BaseException.serviceUnavailable('Image uploads are disabled');
    }
  }

  async createUploadSessions(
    userId: number,
    dto: CreateUploadSessionsRequestDto,
  ): Promise<CreateUploadSessionsResponseDto> {
    this.assertUploadsEnabled();
    this.assertRequestedFiles(dto);

    const expiresAt = new Date(
      Date.now() + POST_IMAGE_UPLOAD_POLICY.presignedExpiresInSeconds * 1000,
    );
    const uploads = dto.files.map((file) => {
      const id = randomUUID();
      return this.mediaUploadRepository.create({
        id,
        userId,
        originalKey: this.getOriginalKey(id),
        declaredContentType: file.contentType,
        declaredSize: file.size,
        status: MediaUploadStatus.PENDING,
        expiresAt,
      });
    });

    const signedUploads = await Promise.all(
      uploads.map((upload) =>
        this.r2Service
          .createPresignedPutUrl(
            upload.originalKey,
            upload.declaredContentType,
            POST_IMAGE_UPLOAD_POLICY.presignedExpiresInSeconds,
          )
          .then((uploadUrl) => ({ upload, uploadUrl })),
      ),
    );

    await this.dataSource.transaction(async (manager) => {
      await manager.save(MediaUpload, uploads);
    });

    return {
      uploads: signedUploads.map(({ upload, uploadUrl }) => ({
        uploadId: upload.id,
        uploadUrl,
        contentType: upload.declaredContentType,
        expiresAt: expiresAt.toISOString(),
      })),
    };
  }

  async findOwnedStatuses(
    userId: number,
    uploadIds: string[],
  ): Promise<FindUploadStatusResponseDto> {
    this.assertUploadIds(uploadIds);
    const uploads = await this.mediaUploadRepository.find({
      where: { id: In(uploadIds), userId },
    });

    if (uploads.length !== uploadIds.length) {
      throw BaseException.notFound(
        'Upload not found',
        ErrorCode.UPLOAD_NOT_FOUND,
      );
    }

    const uploadsById = new Map(uploads.map((upload) => [upload.id, upload]));
    return {
      uploads: uploadIds.map((uploadId) => {
        const upload = uploadsById.get(uploadId)!;
        return {
          uploadId,
          status: upload.status,
          failureCode: upload.failureCode ?? null,
        };
      }),
    };
  }

  async markProcessing(uploadId: string): Promise<MediaUploadStatus> {
    return this.dataSource.transaction(async (manager) => {
      const upload = await this.lockUpload(manager, uploadId);
      if (!upload) {
        throw BaseException.notFound(
          'Upload not found',
          ErrorCode.UPLOAD_NOT_FOUND,
        );
      }

      if (upload.status === MediaUploadStatus.PENDING) {
        upload.status = MediaUploadStatus.PROCESSING;
        await manager.save(upload);
      }

      return upload.status;
    });
  }

  async updateProcessingResult(
    uploadId: string,
    dto: UpdateUploadProcessingResultRequestDto,
  ): Promise<MediaUploadStatus> {
    return this.dataSource.transaction(async (manager) => {
      const upload = await this.lockUpload(manager, uploadId);
      if (!upload) {
        throw BaseException.notFound(
          'Upload not found',
          ErrorCode.UPLOAD_NOT_FOUND,
        );
      }

      if (
        dto.status === MediaUploadStatus.READY &&
        (upload.status === MediaUploadStatus.PENDING ||
          upload.status === MediaUploadStatus.PROCESSING)
      ) {
        upload.status = MediaUploadStatus.READY;
        upload.processedKey = this.getProcessedKey(uploadId);
        upload.sourceEtag = dto.sourceEtag!;
        upload.width = dto.width!;
        upload.height = dto.height!;
        upload.processedSize = dto.processedSize!;
        upload.failureCode = null;
        await manager.save(upload);
      }

      if (
        dto.status === MediaUploadStatus.FAILED &&
        (upload.status === MediaUploadStatus.PENDING ||
          upload.status === MediaUploadStatus.PROCESSING)
      ) {
        upload.status = MediaUploadStatus.FAILED;
        upload.failureCode = dto.failureCode!;
        await manager.save(upload);
      }

      return upload.status;
    });
  }

  async lockReadyUploadsForAttachment(
    manager: EntityManager,
    userId: number,
    uploadIds: string[],
  ): Promise<MediaUpload[]> {
    this.assertUploadIds(uploadIds);
    if (uploadIds.length === 0) {
      return [];
    }
    const uploads = await manager
      .getRepository(MediaUpload)
      .createQueryBuilder('upload')
      .setLock('pessimistic_write')
      .where('upload.id IN (:...uploadIds)', { uploadIds })
      .getMany();

    if (uploads.length !== uploadIds.length) {
      throw BaseException.notFound(
        'Upload not found',
        ErrorCode.UPLOAD_NOT_FOUND,
      );
    }

    const uploadsById = new Map(uploads.map((upload) => [upload.id, upload]));
    const orderedUploads = uploadIds.map(
      (uploadId) => uploadsById.get(uploadId)!,
    );

    for (const upload of orderedUploads) {
      if (upload.userId !== userId) {
        throw BaseException.forbidden(
          'Upload does not belong to the current user',
          ErrorCode.AUTH_FORBIDDEN,
        );
      }
      if (upload.status === MediaUploadStatus.ATTACHED) {
        throw BaseException.conflict(
          'Upload is already attached',
          ErrorCode.UPLOAD_ALREADY_ATTACHED,
        );
      }
      if (upload.status === MediaUploadStatus.FAILED) {
        throw BaseException.badRequest(
          'Upload processing failed',
          ErrorCode.UPLOAD_PROCESSING_FAILED,
        );
      }
      if (upload.status !== MediaUploadStatus.READY || !upload.processedKey) {
        throw BaseException.badRequest(
          'Upload is not ready',
          ErrorCode.UPLOAD_NOT_READY,
        );
      }
    }

    return orderedUploads;
  }

  getProcessedPublicUrl(upload: MediaUpload): string {
    if (!upload.processedKey) {
      throw BaseException.badRequest(
        'Upload is not ready',
        ErrorCode.UPLOAD_NOT_READY,
      );
    }

    return this.r2Service.getPublicUrl(upload.processedKey);
  }

  async markAttached(
    manager: EntityManager,
    uploads: MediaUpload[],
  ): Promise<void> {
    const attachedAt = new Date();
    for (const upload of uploads) {
      upload.status = MediaUploadStatus.ATTACHED;
      upload.attachedAt = attachedAt;
    }
    await manager.save(MediaUpload, uploads);
  }

  getOriginalKey(uploadId: string): string {
    return `${POST_IMAGE_UPLOAD_POLICY.originalPrefix}${uploadId}`;
  }

  getProcessedKey(uploadId: string): string {
    return `${POST_IMAGE_UPLOAD_POLICY.processedPrefix}${uploadId}.webp`;
  }

  private async lockUpload(
    manager: EntityManager,
    uploadId: string,
  ): Promise<MediaUpload | null> {
    return manager.findOne(MediaUpload, {
      where: { id: uploadId },
      lock: { mode: 'pessimistic_write' },
    });
  }

  private assertRequestedFiles(dto: CreateUploadSessionsRequestDto): void {
    if (
      !dto.files?.length ||
      dto.files.length > POST_IMAGE_UPLOAD_POLICY.maxCount
    ) {
      throw BaseException.badRequest(
        'Maximum 5 images are allowed',
        ErrorCode.FILE_TOO_MANY,
      );
    }

    for (const file of dto.files) {
      if (
        !POST_IMAGE_UPLOAD_POLICY.allowedContentTypes.some(
          (allowedContentType) => allowedContentType === file.contentType,
        )
      ) {
        throw BaseException.badRequest(
          'Only JPEG, PNG, and WEBP files are allowed',
          ErrorCode.FILE_INVALID_TYPE,
        );
      }
      if (file.size <= 0 || file.size > POST_IMAGE_UPLOAD_POLICY.maxBytes) {
        throw BaseException.badRequest(
          'Image size exceeds the upload limit',
          ErrorCode.FILE_TOO_LARGE,
        );
      }
    }
  }

  private assertUploadIds(uploadIds: string[]): void {
    if (uploadIds.length > POST_IMAGE_UPLOAD_POLICY.maxCount) {
      throw BaseException.badRequest(
        'Maximum 5 images are allowed',
        ErrorCode.FILE_TOO_MANY,
      );
    }
    if (new Set(uploadIds).size !== uploadIds.length) {
      throw BaseException.badRequest(
        'Duplicate upload IDs are not allowed',
        ErrorCode.BAD_REQUEST,
      );
    }
  }
}
