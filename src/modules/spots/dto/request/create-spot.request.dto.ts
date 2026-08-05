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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ImageSource } from 'src/infrastructure/media/enums/image-source.enum';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import { TagGroup } from 'src/modules/tags/enums/tag-group.enum';

export class CreateSpotRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiPropertyOptional({ enum: SpotCategory })
  @IsOptional()
  @IsEnum(SpotCategory)
  category: SpotCategory;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: '혼여 팁(선택)' })
  @IsOptional()
  @IsString()
  honyeoTip?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ImageSource })
  @IsOptional()
  @IsEnum(ImageSource)
  imageSource?: ImageSource;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageCredit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  externalUrl?: string;

  @ApiProperty({ description: '소속 여행지 slug' })
  @IsString()
  @IsNotEmpty()
  destinationSlug: string;

  @ApiPropertyOptional({
    enum: TagGroup,
    isArray: true,
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
