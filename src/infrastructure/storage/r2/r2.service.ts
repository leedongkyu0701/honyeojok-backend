import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { ConfigType } from '@nestjs/config';
import { BaseException } from 'src/common/exceptions/base.exception';
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

  async createPresignedPutUrl(
    key: string,
    contentType: string,
    expiresIn: number,
  ): Promise<string> {
    const r2Client = this.r2Client;
    const bucketName = this.bucketName;

    if (!r2Client || !bucketName) {
      throw BaseException.serviceUnavailable('R2 config missing', {
        provider: 'r2',
      });
    }

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: contentType,
      });

      return await getSignedUrl(r2Client, command, { expiresIn });
    } catch (error) {
      this.logger.error(
        `Failed to create a presigned upload URL for ${key}: ${getErrorMessage(error)}`,
      );
      throw BaseException.serviceUnavailable('Image upload is unavailable', {
        provider: 'r2',
      });
    }
  }

  async deleteObject(key: string): Promise<void> {
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
      this.logger.error(
        `Failed to delete image with key ${key}: ${getErrorMessage(error)}`,
      );
      throw BaseException.serviceUnavailable('Image delete failed', {
        provider: 'r2',
      });
    }
  }

  getPublicUrl(key: string): string {
    if (!this.publicUrl) {
      throw BaseException.serviceUnavailable('R2 config missing', {
        provider: 'r2',
      });
    }

    return `${this.publicUrl}/${key}`;
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
