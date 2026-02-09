// src/trip-routes/dtos/create-trip-route-day.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateTripRouteItemDto } from './create-trip-route-item.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripRouteDayDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  dayNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: [CreateTripRouteItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteItemDto)
  items: CreateTripRouteItemDto[];
}
