import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTripRouteItemDto } from './create-trip-route-item.dto';

export class CreateTripRouteDayDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  dayNumber: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty({ type: [CreateTripRouteItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteItemDto)
  items: CreateTripRouteItemDto[];
}
