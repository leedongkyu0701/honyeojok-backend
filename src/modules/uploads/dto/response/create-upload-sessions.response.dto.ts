import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadSessionResponseDto {
  @ApiProperty()
  uploadId: string;

  @ApiProperty()
  uploadUrl: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  expiresAt: string;
}

export class CreateUploadSessionsResponseDto {
  @ApiProperty({ type: [CreateUploadSessionResponseDto] })
  uploads: CreateUploadSessionResponseDto[];
}
