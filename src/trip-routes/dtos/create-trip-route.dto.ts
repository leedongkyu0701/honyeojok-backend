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

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  days: number;

  // ✅ 태그는 slug 배열로 받기 (ex: ["sea","emotional"])
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
