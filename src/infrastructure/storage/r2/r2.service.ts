import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import type { ConfigType } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { Logger } from '@nestjs/common';
import { storageConfig } from 'src/config/storage.config';

@Injectable()
export class R2Service {
  private r2Client?: S3Client;
  private bucketName?: string;
  private publicUrl?: string;
  private readonly logger = new Logger(R2Service.name);

  constructor(
    @Inject(storageConfig.KEY)
    private readonly config: ConfigType<typeof storageConfig>,
  ) {
    if (!this.config.imageUploadEnabled) {
      return;
    }

    const { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl } =
      this.config.r2;

    if (
      !accountId ||
      !accessKeyId ||
      !secretAccessKey ||
      !bucketName ||
      !publicUrl
    ) {
      throw BaseException.serviceUnavailable('R2 config missing', {
        provider: 'r2',
      });
    }

    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    this.bucketName = bucketName;
    this.publicUrl = publicUrl;
  }

  async uploadImage(key: string, body: Buffer): Promise<string> {
    const r2Client = this.r2Client;
    const bucketName = this.bucketName;
    const publicUrl = this.publicUrl;

    if (!r2Client || !bucketName || !publicUrl) {
      throw BaseException.serviceUnavailable('R2 config missing', {
        provider: 'r2',
      });
    }

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: 'image/webp',
        ContentLength: body.length,
        CacheControl: 'public, max-age=31536000, immutable',
      });

      await r2Client.send(command);
      return `${publicUrl}/${key}`;
    } catch (error) {
      this.logger.error(`Failed to upload image with key ${key}:`, error);
      throw new BaseException(
        'Failed to upload image',
        ErrorCode.FILE_UPLOAD_FAILED,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async deleteImage(key: string): Promise<void> {
    const r2Client = this.r2Client;
    const bucketName = this.bucketName;

    if (!r2Client || !bucketName) {
      return;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      await r2Client.send(command);
    } catch (error) {
      this.logger.error(`Failed to delete image with key ${key}:`, error);
      throw BaseException.serviceUnavailable('Image delete failed', {
        provider: 'r2',
      });
    }
  }

  extractKeyFromUrl(url: string): string {
    return this.publicUrl ? url.replace(`${this.publicUrl}/`, '') : url;
  }
}
