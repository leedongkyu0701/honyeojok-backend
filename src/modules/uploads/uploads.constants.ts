export const POST_IMAGE_UPLOAD_POLICY = {
  maxCount: 5,
  maxBytes: 6 * 1024 * 1024,
  allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxPixels: 20_000_000,
  maxWidth: 1280,
  maxHeight: 720,
  outputFormat: 'image/webp',
  quality: 80,
  presignedExpiresInSeconds: 300,
  originalPrefix: 'images/posts/original/',
  processedPrefix: 'images/posts/processed/',
} as const;

export const UPLOAD_CLEANUP_GRACE_PERIOD_MS = 24 * 60 * 60 * 1000;
