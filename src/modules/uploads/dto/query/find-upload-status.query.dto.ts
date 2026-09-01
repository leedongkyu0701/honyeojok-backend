import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POST_IMAGE_UPLOAD_POLICY } from '../../uploads.constants';

export class FindUploadStatusQueryDto {
  @ApiProperty({
    description:
      'Comma-separated upload UUIDs. The response preserves this order.',
    example:
      '550e8400-e29b-41d4-a716-446655440000,660e8400-e29b-41d4-a716-446655440000',
  })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.flatMap((item) => String(item).split(','))
      : String(value ?? '')
          .split(',')
          .filter(Boolean),
  )
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(POST_IMAGE_UPLOAD_POLICY.maxCount)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  ids: string[];
}
