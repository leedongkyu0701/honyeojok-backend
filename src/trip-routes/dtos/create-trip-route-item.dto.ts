import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteItemDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ default: 3, minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  recommendedLevel?: number;

  // Spot 연결용(선택)
  @ApiPropertyOptional({ description: '연결할 Spot slug (선택)' })
  @IsOptional()
  @IsString()
  spotSlug?: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ description: '상세 설명(필수)' })
  @IsString()
  description: string;

  // 커스텀 이미지/출처
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageCredit?: string;

  // 지도/주소
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

  @ApiPropertyOptional({ description: '주소(선택)' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '10:30' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ example: '12:00' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  externalUrl?: string;
}
