import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ImageSource } from 'src/infrastructure/media/enums/image-source.enum';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import { TagGroup } from 'src/modules/tags/enums/tag-group.enum';

export class CreateSpotRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(SpotCategory)
  category: SpotCategory;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: '혼여 팁(선택)' })
  @IsOptional()
  @IsString()
  honyeoTip?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(ImageSource)
  imageSource?: ImageSource;

  @IsOptional()
  @IsString()
  imageCredit?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsUrl()
  externalUrl?: string;

  /** 소속 여행지 slug */
  @IsString()
  @IsNotEmpty()
  destinationSlug: string;

  @ApiPropertyOptional({
    example: ['healing', 'sea'],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(3)
  @IsEnum(TagGroup, { each: true })
  tagSlugs?: TagGroup[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isRecommended?: boolean;
}
