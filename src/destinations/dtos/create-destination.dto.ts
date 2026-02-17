import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ArrayUnique,
  IsArray,
} from 'class-validator';
import { ProvinceGroup } from 'src/types/destination';
import { ImageSource } from 'src/types/util';

export class CreateDestinationDto {
  @ApiProperty({ example: 'jeju' })
  @IsString()
  slug: string;

  @ApiProperty({ example: '제주' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ProvinceGroup })
  @IsEnum(ProvinceGroup)
  province: ProvinceGroup;

  @ApiProperty({ example: 4.7, description: '0~5 평점' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  score: number;

  @ApiProperty({ example: 1, description: '노출 순서(유니크)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  rank: number;

  @ApiProperty({ example: 33.4996 })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 126.5312 })
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: '혼자 여행하기 좋은 섬' })
  @IsString()
  summary: string;

  @ApiProperty({ example: '제주는 혼자 여행하기에도...' })
  @IsString()
  description: string;

  // 혼여 지표 (0~10 가정)
  @ApiProperty({ example: 6, minimum: 0, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  food: number;

  @ApiProperty({ example: 7, minimum: 0, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  transport: number;

  @ApiProperty({ example: 8, minimum: 0, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  safety: number;

  @ApiProperty({ example: 3, minimum: 0, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  loneliness: number;

  // 이미지 (엔티티 nullable 고려)
  @ApiPropertyOptional({ example: 'https://cdn.../jeju.webp' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ImageSource })
  @IsOptional()
  @IsEnum(ImageSource)
  imageSource?: ImageSource;

  @ApiPropertyOptional({ example: 'Photo by ...' })
  @IsOptional()
  @IsString()
  imageCredit?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['solo', 'quiet', 'safe'],
    description: '연결할 태그 slug 목록',
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tagSlugs?: string[];
}
