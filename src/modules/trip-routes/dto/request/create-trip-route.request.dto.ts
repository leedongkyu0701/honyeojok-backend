import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateTripRouteDayRequestDto } from './create-trip-route-day.request.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteRequestDto {
  @IsString()
  slug: string;

  /** 소속 여행지 slug (예: jeju) */
  @IsString()
  destinationSlug: string;

  @IsString()
  title: string;

  @IsString()
  summary: string;

  @ApiPropertyOptional({ description: '혼여 팁', example: '각 루트별 팁!' })
  @IsOptional()
  @IsString()
  honyeoTip?: string;

  /** 일수(보통 daysPlan.length와 일치해야 함) */
  @IsInt()
  @Min(1)
  days: number;

  @ApiPropertyOptional({ description: '혼여 예상 비용', example: 500000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  honyeoCost?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagSlugs?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteDayRequestDto)
  daysPlan: CreateTripRouteDayRequestDto[];
}
