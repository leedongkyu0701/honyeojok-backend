export interface Env {
  MEDIA_BUCKET: R2Bucket;
  IMAGES: ImagesBinding;
  BACKEND_API_BASE_URL: string;
  MEDIA_WORKER_SECRET: string;
}

export type BackendUploadStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'READY'
  | 'FAILED'
  | 'ATTACHED';
