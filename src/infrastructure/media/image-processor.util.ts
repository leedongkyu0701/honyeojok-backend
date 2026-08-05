import sharp from 'sharp';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export const IMAGE_PRESETS = {
  REVIEW: {
    width: 1280,
    height: 720,
    fit: 'inside',
    quality: 80,
  },
  // 나중에 썸네일 등 확장 가능
} as const;

const MAX_IMAGE_PIXELS = 20_000_000; // 20MP

export async function processImageBuffer(
  fileBuffer: Buffer,
  preset: keyof typeof IMAGE_PRESETS,
): Promise<Buffer> {
  // preset 방어
  const presetConfig = IMAGE_PRESETS[preset];
  if (!presetConfig) {
    throw BaseException.badRequest(
      'Invalid image preset',
      ErrorCode.BAD_REQUEST,
    );
  }

  if (!fileBuffer || fileBuffer.length === 0) {
    throw BaseException.badRequest('Empty file', ErrorCode.FILE_INVALID_TYPE);
  }

  try {
    const image = sharp(fileBuffer, { failOn: 'error' });
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw BaseException.badRequest(
        'Invalid image',
        ErrorCode.FILE_INVALID_TYPE,
      );
    }

    const pixels = metadata.width * metadata.height;
    if (pixels > MAX_IMAGE_PIXELS) {
      throw BaseException.badRequest(
        'Image resolution too large',
        ErrorCode.FILE_TOO_LARGE,
        {
          maxPixels: MAX_IMAGE_PIXELS,
          width: metadata.width,
          height: metadata.height,
        },
      );
    }

    const { width, height, fit, quality } = presetConfig;

    return await image
      .rotate()
      .resize({
        width,
        height,
        fit,
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 4 })
      .toBuffer();
  } catch (err) {
    if (err instanceof BaseException) throw err;

    const msg = String(err instanceof Error ? err.message : '').toLowerCase();
    const userFault =
      msg.includes('unsupported') ||
      msg.includes('invalid') ||
      msg.includes('corrupt') ||
      msg.includes('input buffer') ||
      msg.includes('premature end');

    if (userFault) {
      throw BaseException.badRequest(
        'Invalid image file',
        ErrorCode.FILE_INVALID_TYPE,
      );
    }

    throw new BaseException(
      'Image processing failed',
      ErrorCode.INTERNAL_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      { lib: 'sharp' },
    );
  }
}
