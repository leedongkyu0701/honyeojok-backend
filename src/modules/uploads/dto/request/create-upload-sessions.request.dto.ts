import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POST_IMAGE_UPLOAD_POLICY } from '../../uploads.constants';

export class CreateUploadSessionFileRequestDto {
  @ApiProperty({ enum: POST_IMAGE_UPLOAD_POLICY.allowedContentTypes })
  @IsIn(POST_IMAGE_UPLOAD_POLICY.allowedContentTypes)
  contentType: string;

  @ApiProperty({ maximum: POST_IMAGE_UPLOAD_POLICY.maxBytes })
  @IsInt()
  @Min(1)
  @Max(POST_IMAGE_UPLOAD_POLICY.maxBytes)
  size: number;
}

export class CreateUploadSessionsRequestDto {
  @ApiProperty({
    type: [CreateUploadSessionFileRequestDto],
    maxItems: POST_IMAGE_UPLOAD_POLICY.maxCount,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(POST_IMAGE_UPLOAD_POLICY.maxCount)
  @ValidateNested({ each: true })
  @Type(() => CreateUploadSessionFileRequestDto)
  files: CreateUploadSessionFileRequestDto[];
}
