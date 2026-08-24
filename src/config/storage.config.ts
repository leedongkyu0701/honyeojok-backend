import { registerAs } from '@nestjs/config';
import { getEnvironment } from './environment';

export const storageConfig = registerAs('storage', () => {
  const env = getEnvironment();

  return {
    imageUploadEnabled: env.IMAGE_UPLOAD_ENABLED,
    r2: {
      accountId: env.R2_ACCOUNT_ID,
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      bucketName: env.R2_BUCKET_NAME,
      publicUrl: env.R2_PUBLIC_URL,
    },
  };
});
