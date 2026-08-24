import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { processImageBuffer } from 'src/infrastructure/media/image-processor.util';
import { R2Service } from 'src/infrastructure/storage/r2/r2.service';
import { storageConfig } from 'src/config/storage.config';

type PreparedPostImage = {
  buffer: Buffer;
  caption?: string;
  imgOrder: number;
};

type UploadedPostImage = PreparedPostImage & {
  key: string;
  imageUrl: string;
};

@Injectable()
export class PostMediaService {
  private readonly logger = new Logger(PostMediaService.name);

  constructor(
    private readonly r2Service: R2Service,
    @Inject(storageConfig.KEY)
    private readonly config: ConfigType<typeof storageConfig>,
  ) {}

  assertUploadsEnabled(): void {
    if (!this.config.imageUploadEnabled) {
      throw BaseException.serviceUnavailable('Image uploads are disabled');
    }
  }

  async prepareImages(
    images?: Express.Multer.File[],
    captions?: string[],
  ): Promise<PreparedPostImage[]> {
    if (!images?.length) return [];

    if (images.length > 5) {
      throw BaseException.badRequest(
        'Maximum 5 images are allowed',
        ErrorCode.FILE_TOO_MANY,
      );
    }

    const imageCaptions = captions ?? [];
    if (imageCaptions.length > images.length) {
      throw BaseException.badRequest(
        'Captions count cannot exceed images count',
        ErrorCode.VALIDATION_FAILED,
      );
    }

    const preparedImages: PreparedPostImage[] = [];
    for (let index = 0; index < images.length; index += 1) {
      const image = images[index];
      preparedImages.push({
        buffer: await processImageBuffer(image.buffer, 'REVIEW'),
        caption: imageCaptions[index]?.trim(),
        imgOrder: index,
      });
    }

    return preparedImages;
  }

  async uploadImages(
    postId: number,
    images: PreparedPostImage[],
  ): Promise<UploadedPostImage[]> {
    const uploadedImages: UploadedPostImage[] = [];

    try {
      for (const image of images) {
        const key = `posts/${postId}/${randomUUID()}.webp`;
        const imageUrl = await this.r2Service.uploadImage(key, image.buffer);
        uploadedImages.push({ ...image, key, imageUrl });
      }
    } catch (error) {
      await this.rollbackImages(uploadedImages.map((image) => image.key));
      throw error;
    }

    return uploadedImages;
  }

  async rollbackImages(keys: string[]): Promise<void> {
    await Promise.all(
      keys.map(async (key) => {
        try {
          await this.r2Service.deleteImage(key);
        } catch (error) {
          this.logger.warn(
            `rollbackImages failed : could not delete image with key ${key}`,
            error,
          );
        }
      }),
    );
  }

  async deleteImages(imageUrls: string[]): Promise<void> {
    await Promise.allSettled(
      imageUrls.map((imageUrl) =>
        this.r2Service.deleteImage(this.r2Service.extractKeyFromUrl(imageUrl)),
      ),
    );
  }
}
