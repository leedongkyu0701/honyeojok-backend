import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsArray,
  ArrayMaxSize,
  ArrayUnique,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PostType } from 'src/modules/posts/enums/post-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostImageRequestDto } from './create-post-image.request.dto';
import { POST_IMAGE_UPLOAD_POLICY } from 'src/modules/uploads/uploads.constants';

export class CreatePostRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ enum: PostType })
  @IsEnum(PostType)
  type: PostType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regionSlug?: string;

  @ApiPropertyOptional({ type: [CreatePostImageRequestDto] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(POST_IMAGE_UPLOAD_POLICY.maxCount)
  @ArrayUnique((image: CreatePostImageRequestDto) => image.uploadId)
  @ValidateNested({ each: true })
  @Type(() => CreatePostImageRequestDto)
  images?: CreatePostImageRequestDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
