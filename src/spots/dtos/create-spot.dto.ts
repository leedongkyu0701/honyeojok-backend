import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ImageSource } from 'src/types/destination';

export class CreateSpotDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  // 한 줄 소개 (카드용)
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  // 상세 설명
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsEnum(ImageSource)
  @IsOptional()
  imageSource?: ImageSource;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageCredit?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  externalUrl?: string;

  // 연결할 Destination slug
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  regionSlug: string;

  // ✅ 태그는 slug 배열로 받기 (ex: ["sea","emotional"])
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagSlugs: string[];

  @ApiProperty()
  @IsBoolean()
  isRecommended: boolean;
}
