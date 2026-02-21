// src/posts/dtos/create-post.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { PostType } from 'src/types/post';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ enum: PostType })
  @IsNotEmpty()
  type: PostType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regionSlug?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === 'string') return [value];
    return [];
  })
  @IsString({ each: true })
  captions?: string[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @Transform(({ value }) =>
    value === '' || value === undefined ? undefined : Number(value),
  )
  rating?: number;
}
