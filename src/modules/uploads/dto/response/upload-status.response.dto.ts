import { ApiPropertyOptional } from '@nestjs/swagger';
import { MediaUploadStatus } from '../../enums/media-upload-status.enum';

export class UploadStatusResponseDto {
  uploadId: string;

  status: MediaUploadStatus;

  @ApiPropertyOptional({ nullable: true })
  failureCode: string | null;
}

export class FindUploadStatusResponseDto {
  uploads: UploadStatusResponseDto[];
}
