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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteItemRequestDto {
  @IsInt()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ default: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  recommendedLevel?: number;

  /** 연결할 Spot slug (선택) */
  @IsOptional()
  @IsString()
  spotSlug?: string;

  @IsString()
  title: string;

  /** 상세 설명(필수) */
  @IsString()
  description: string;

  // 커스텀 이미지/출처
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imageCredit?: string;

  // 지도/주소
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;

  /** 주소(선택) */
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

  @IsOptional()
  @IsUrl()
  externalUrl?: string;
}
