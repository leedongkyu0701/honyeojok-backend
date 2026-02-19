// src/trip-routes/dtos/create-trip-route.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateTripRouteDayDto } from './create-trip-route-day.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty({ description: '소속 여행지 slug (예: jeju)' })
  @IsString()
  destinationSlug: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiPropertyOptional({ description: '혼여 팁', example: '각 루트별 팁!' })
  @IsOptional()
  @IsString()
  honyeoTip?: string;

  @ApiProperty({ description: '일수(보통 daysPlan.length와 일치해야 함)' })
  @IsInt()
  @Min(1)
  days: number;

  @ApiPropertyOptional({ description: '혼여 예상 비용', example: 500000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  honyeoCost?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagSlugs?: string[];

  @ApiProperty({ type: [CreateTripRouteDayDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteDayDto)
  daysPlan: CreateTripRouteDayDto[];
}
