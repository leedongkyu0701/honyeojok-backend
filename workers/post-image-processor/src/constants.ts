export const POST_IMAGE_PROCESSING_POLICY = {
  bucketName: 'honyeo',
  maxBytes: 6 * 1024 * 1024,
  maxPixels: 20_000_000,
  maxWidth: 1280,
  maxHeight: 720,
  quality: 80,
  originalPrefix: 'images/posts/original/',
  processedPrefix: 'images/posts/processed/',
} as const;

const UPLOAD_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SUPPORTED_R2_ACTIONS = new Set([
  'PutObject',
  'CompleteMultipartUpload',
  'CopyObject',
]);

const SUPPORTED_IMAGE_FORMATS = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'jpeg',
  'jpg',
  'png',
  'webp',
]);

type UnknownRecord = Record<string, unknown>;

export type R2EventNotification = {
  action: string;
  bucket: string;
  object: {
    key: string;
    size: number;
    eTag: string;
  };
  eventTime: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

export function parseR2EventNotification(
  value: unknown,
): R2EventNotification | null {
  if (!isRecord(value) || !isRecord(value.object)) return null;

  const { action, bucket, eventTime, object } = value;
  if (
    typeof action !== 'string' ||
    typeof bucket !== 'string' ||
    typeof eventTime !== 'string' ||
    typeof object.key !== 'string' ||
    typeof object.size !== 'number' ||
    !Number.isFinite(object.size) ||
    object.size < 0 ||
    typeof object.eTag !== 'string' ||
    !SUPPORTED_R2_ACTIONS.has(action)
  ) {
    return null;
  }

  return {
    action,
    bucket,
    eventTime,
    object: {
      key: object.key,
      size: object.size,
      eTag: object.eTag,
    },
  };
}

export function extractUploadIdFromOriginalKey(key: string): string | null {
  if (!key.startsWith(POST_IMAGE_PROCESSING_POLICY.originalPrefix)) {
    return null;
  }

  const uploadId = key.slice(
    POST_IMAGE_PROCESSING_POLICY.originalPrefix.length,
  );
  return UPLOAD_ID_PATTERN.test(uploadId) ? uploadId.toLowerCase() : null;
}

export function getProcessedKey(uploadId: string): string {
  return `${POST_IMAGE_PROCESSING_POLICY.processedPrefix}${uploadId}.webp`;
}

export function isSupportedImageFormat(format: string): boolean {
  return SUPPORTED_IMAGE_FORMATS.has(format.toLowerCase());
}

export function normalizeEtag(etag: string): string {
  return etag.replace(/^"|"$/g, '');
}

export function isPermanentImageValidationError(error: unknown): boolean {
  if (!isRecord(error)) return false;
  if (error.code === 9412) return true;

  const message =
    typeof error.message === 'string' ? error.message.toLowerCase() : '';
  return /invalid|unsupported|corrupt|decode|not an image|malformed/.test(
    message,
  );
}
