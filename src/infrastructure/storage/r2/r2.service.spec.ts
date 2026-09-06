import { S3Client } from '@aws-sdk/client-s3';
import { R2Service } from './r2.service';

describe('R2Service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('destroys the S3 client on application shutdown when uploads are enabled', () => {
    const destroy = jest.spyOn(S3Client.prototype, 'destroy');
    const service = new R2Service({
      imageUploadEnabled: true,
      r2: {
        accountId: 'account-id',
        accessKeyId: 'access-key-id',
        secretAccessKey: 'secret-access-key',
        bucketName: 'bucket-name',
        publicUrl: 'https://images.example.com',
      },
    } as never);

    service.onApplicationShutdown();

    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('safely skips cleanup when uploads are disabled', () => {
    const destroy = jest.spyOn(S3Client.prototype, 'destroy');
    const service = new R2Service({
      imageUploadEnabled: false,
      r2: {},
    } as never);

    service.onApplicationShutdown();

    expect(destroy).not.toHaveBeenCalled();
  });
});
