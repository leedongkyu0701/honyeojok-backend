import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaUploadStatus } from '../../enums/media-upload-status.enum';

export class UploadStatusResponseDto {
  @ApiProperty()
  uploadId: string;

  @ApiProperty({ enum: MediaUploadStatus })
  status: MediaUploadStatus;

  @ApiPropertyOptional({ nullable: true })
  failureCode: string | null;
}

export class FindUploadStatusResponseDto {
  @ApiProperty({ type: [UploadStatusResponseDto] })
  uploads: UploadStatusResponseDto[];
}
