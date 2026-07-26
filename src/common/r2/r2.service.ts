import { HttpStatus, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { BaseException, ErrorCode } from '../exceptions/base.exception';
import { Logger } from '@nestjs/common';

@Injectable()
export class R2Service {
  private r2Client?: S3Client;
  private bucketName?: string;
  private publicUrl?: string;
  private readonly logger = new Logger(R2Service.name);

  constructor(private readonly configService: ConfigService) {
    if (this.configService.get<string>('IMAGE_UPLOAD_ENABLED') !== 'true') {
      return;
    }

    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'R2_SECRET_ACCESS_KEY',
    );
    const bucketName = this.configService.get<string>('R2_BUCKET_NAME');
    const publicUrl = this.configService.get<string>('R2_PUBLIC_URL');

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
