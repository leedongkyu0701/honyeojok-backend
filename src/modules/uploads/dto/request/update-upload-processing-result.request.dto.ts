import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { MediaUploadStatus } from '../../enums/media-upload-status.enum';

const hasStatus = (object: object, status: MediaUploadStatus): boolean =>
  'status' in object && object.status === status;

export class UpdateUploadProcessingResultRequestDto {
  @ApiProperty({ enum: [MediaUploadStatus.READY, MediaUploadStatus.FAILED] })
  @IsIn([MediaUploadStatus.READY, MediaUploadStatus.FAILED])
  status: MediaUploadStatus.READY | MediaUploadStatus.FAILED;

  @ApiPropertyOptional()
  @ValidateIf((object: object) => hasStatus(object, MediaUploadStatus.READY))
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  sourceEtag?: string;

  @ApiPropertyOptional({ minimum: 1 })
  @ValidateIf((object: object) => hasStatus(object, MediaUploadStatus.READY))
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @ValidateIf((object: object) => hasStatus(object, MediaUploadStatus.READY))
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @ValidateIf((object: object) => hasStatus(object, MediaUploadStatus.READY))
  @IsInt()
  @Min(1)
  processedSize?: number;

  @ApiPropertyOptional({ maxLength: 100 })
  @ValidateIf((object: object) => hasStatus(object, MediaUploadStatus.FAILED))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  failureCode?: string;
}
