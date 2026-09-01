import {
  extractUploadIdFromOriginalKey,
  getProcessedKey,
  isPermanentImageValidationError,
  isSupportedImageFormat,
  normalizeEtag,
  parseR2EventNotification,
  POST_IMAGE_PROCESSING_POLICY,
  type R2EventNotification,
} from './constants';
import type { BackendUploadStatus, Env } from './types';

class BackendCallbackError extends Error {
  constructor(readonly status: number) {
    super(`Backend callback failed with HTTP ${status}`);
  }
}

type BackendCallbackResult = {
  missing: boolean;
  status?: BackendUploadStatus;
};

type ImageInfo = {
  format: string;
  fileSize: number;
  width: number;
  height: number;
};

export default {
  async queue(batch: MessageBatch<unknown>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processMessage(env, message.id, message.attempts, message.body);
        message.ack();
      } catch (error) {
        console.error('Post image processing will be retried', {
          queueMessageId: message.id,
          attempt: message.attempts,
          error: error instanceof Error ? error.message : String(error),
        });
        message.retry();
      }
    }
  },
} satisfies ExportedHandler<Env>;

async function processMessage(
  env: Env,
  queueMessageId: string,
  attempt: number,
  body: unknown,
): Promise<void> {
  const event = parseR2EventNotification(body);
  if (
    !event ||
    event.bucket !== POST_IMAGE_PROCESSING_POLICY.bucketName ||
    !event.object.key.startsWith(POST_IMAGE_PROCESSING_POLICY.originalPrefix)
  ) {
    console.warn('Ignored non-post-image R2 event', {
      queueMessageId,
      attempt,
    });
    return;
  }

  const uploadId = extractUploadIdFromOriginalKey(event.object.key);
  if (!uploadId) {
    console.warn('Ignored malformed post image upload key', {
      queueMessageId,
      key: event.object.key,
    });
    return;
  }

  const processing = await callBackend(
    env,
    `/internal/uploads/${uploadId}/processing`,
  );
  if (processing.missing) {
    await env.MEDIA_BUCKET.delete(event.object.key);
    return;
  }

  const original = await env.MEDIA_BUCKET.get(event.object.key);
  if (!original) {
    if (isTerminalUploadStatus(processing.status)) {
      return;
    }
    await finalizePermanentFailure(env, event, uploadId, 'ORIGINAL_NOT_FOUND');
    return;
  }

  if (normalizeEtag(original.etag) !== normalizeEtag(event.object.eTag)) {
    console.info('Skipped stale post image event', {
      queueMessageId,
      uploadId,
      key: event.object.key,
      sourceEtag: event.object.eTag,
    });
    return;
  }

  if (isTerminalUploadStatus(processing.status)) {
    await env.MEDIA_BUCKET.delete(event.object.key);
    return;
  }

  if (
    event.object.size > POST_IMAGE_PROCESSING_POLICY.maxBytes ||
    original.size > POST_IMAGE_PROCESSING_POLICY.maxBytes
  ) {
    await finalizePermanentFailure(env, event, uploadId, 'FILE_TOO_LARGE');
    return;
  }

  const [infoStream, transformStream] = original.body.tee();
  let inputInfo: ImageInfo;
  try {
    inputInfo = await getRasterImageInfo(env, infoStream);
  } catch (error) {
    if (isPermanentImageValidationError(error)) {
      await finalizePermanentFailure(env, event, uploadId, 'INVALID_IMAGE');
      return;
    }
    throw error;
  }

  if (
    inputInfo.fileSize > POST_IMAGE_PROCESSING_POLICY.maxBytes ||
    !isSupportedImageFormat(inputInfo.format)
  ) {
    await finalizePermanentFailure(
      env,
      event,
      uploadId,
      inputInfo.fileSize > POST_IMAGE_PROCESSING_POLICY.maxBytes
        ? 'FILE_TOO_LARGE'
        : 'INVALID_IMAGE',
    );
    return;
  }

  if (
    inputInfo.width * inputInfo.height >
    POST_IMAGE_PROCESSING_POLICY.maxPixels
  ) {
    await finalizePermanentFailure(
      env,
      event,
      uploadId,
      'PIXEL_LIMIT_EXCEEDED',
    );
    return;
  }

  const processedKey = getProcessedKey(uploadId);
  const existing = await env.MEDIA_BUCKET.head(processedKey);
  const existingSourceEtag = existing?.customMetadata?.sourceEtag;
  const existingWidth = toPositiveInteger(existing?.customMetadata?.width);
  const existingHeight = toPositiveInteger(existing?.customMetadata?.height);
  if (
    existing &&
    existingSourceEtag &&
    normalizeEtag(existingSourceEtag) === normalizeEtag(event.object.eTag) &&
    existingWidth &&
    existingHeight
  ) {
    const callback = await reportReady(env, uploadId, {
      sourceEtag: event.object.eTag,
      width: existingWidth,
      height: existingHeight,
      processedSize: existing.size,
    });
    await finalizeReadyCallback(env, event.object.key, processedKey, callback);
    return;
  }

  let transformed: ImageTransformationResult;
  try {
    transformed = await env.IMAGES.input(transformStream)
      .transform({
        width: POST_IMAGE_PROCESSING_POLICY.maxWidth,
        height: POST_IMAGE_PROCESSING_POLICY.maxHeight,
        fit: 'scale-down',
      })
      .output({
        format: 'image/webp',
        quality: POST_IMAGE_PROCESSING_POLICY.quality,
        anim: false,
      });
  } catch (error) {
    if (isPermanentImageValidationError(error)) {
      await finalizePermanentFailure(env, event, uploadId, 'INVALID_IMAGE');
      return;
    }
    throw error;
  }

  const [processedInfoStream, processedStorageStream] = transformed
    .image()
    .tee();
  const outputInfo = await getRasterImageInfo(env, processedInfoStream);

  const processed = await env.MEDIA_BUCKET.put(
    processedKey,
    processedStorageStream,
    {
      httpMetadata: {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000, immutable',
      },
      customMetadata: {
        sourceEtag: event.object.eTag,
        width: String(outputInfo.width),
        height: String(outputInfo.height),
      },
    },
  );

  const callback = await reportReady(env, uploadId, {
    sourceEtag: event.object.eTag,
    width: outputInfo.width,
    height: outputInfo.height,
    processedSize: processed.size,
  });
  await finalizeReadyCallback(env, event.object.key, processedKey, callback);

  console.info('Post image processing completed', {
    queueMessageId,
    attempt,
    uploadId,
    key: event.object.key,
    sourceEtag: event.object.eTag,
    status: 'READY',
  });
}

async function finalizePermanentFailure(
  env: Env,
  event: R2EventNotification,
  uploadId: string,
  failureCode: string,
): Promise<void> {
  await callBackend(env, `/internal/uploads/${uploadId}/result`, {
    status: 'FAILED',
    failureCode,
  });
  await env.MEDIA_BUCKET.delete(event.object.key);
  console.warn('Post image processing failed permanently', {
    uploadId,
    key: event.object.key,
    sourceEtag: event.object.eTag,
    failureCode,
  });
}

async function reportReady(
  env: Env,
  uploadId: string,
  result: {
    sourceEtag: string;
    width: number;
    height: number;
    processedSize: number;
  },
): Promise<BackendCallbackResult> {
  return callBackend(env, `/internal/uploads/${uploadId}/result`, {
    status: 'READY',
    ...result,
  });
}

async function finalizeReadyCallback(
  env: Env,
  originalKey: string,
  processedKey: string,
  callback: BackendCallbackResult,
): Promise<void> {
  if (callback.missing || callback.status === 'FAILED') {
    await env.MEDIA_BUCKET.delete(processedKey);
    await env.MEDIA_BUCKET.delete(originalKey);
    return;
  }

  if (callback.status === 'READY' || callback.status === 'ATTACHED') {
    await env.MEDIA_BUCKET.delete(originalKey);
    return;
  }

  throw new Error(
    `Unexpected upload status after READY callback: ${callback.status ?? 'missing'}`,
  );
}

async function callBackend(
  env: Env,
  path: string,
  body?: Record<string, unknown>,
): Promise<BackendCallbackResult> {
  const baseUrl = env.BACKEND_API_BASE_URL.replace(/\/+$/, '');
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.MEDIA_WORKER_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 404) {
    return { missing: true };
  }
  if (!response.ok) {
    throw new BackendCallbackError(response.status);
  }

  const payload: unknown = await response.json();
  return {
    missing: false,
    status: getBackendUploadStatus(payload),
  };
}

function getBackendUploadStatus(
  payload: unknown,
): BackendUploadStatus | undefined {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('status' in payload)
  ) {
    return undefined;
  }

  switch (payload.status) {
    case 'PENDING':
    case 'PROCESSING':
    case 'READY':
    case 'FAILED':
    case 'ATTACHED':
      return payload.status;
    default:
      return undefined;
  }
}

function isTerminalUploadStatus(
  status: BackendUploadStatus | undefined,
): boolean {
  return status === 'READY' || status === 'ATTACHED' || status === 'FAILED';
}

async function getRasterImageInfo(
  env: Env,
  stream: ReadableStream<Uint8Array>,
): Promise<ImageInfo> {
  const info = await env.IMAGES.info(stream);
  if (!('width' in info)) {
    throw new Error('Unsupported image format');
  }
  return info;
}

function toPositiveInteger(value: string | undefined): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const numberValue = Number(value);
  return Number.isSafeInteger(numberValue) && numberValue > 0
    ? numberValue
    : null;
}
