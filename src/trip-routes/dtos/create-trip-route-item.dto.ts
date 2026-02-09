// src/trip-routes/dtos/create-trip-route-item.dto.ts
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { TripRouteItemType } from 'src/types/trip-route';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteItemDto {
  @ApiProperty({ enum: TripRouteItemType })
  @IsEnum(TripRouteItemType)
  type: TripRouteItemType;

  @ApiProperty()
  @IsInt()
  @Min(1)
  order: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  recommendedLevel: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  externalUrl?: string;
}
