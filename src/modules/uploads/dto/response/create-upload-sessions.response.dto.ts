export class CreateUploadSessionResponseDto {
  uploadId: string;

  uploadUrl: string;

  contentType: string;

  expiresAt: string;
}

export class CreateUploadSessionsResponseDto {
  uploads: CreateUploadSessionResponseDto[];
}
