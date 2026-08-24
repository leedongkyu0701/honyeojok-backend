import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTripRouteItemRequestDto } from './create-trip-route-item.request.dto';

export class CreateTripRouteDayRequestDto {
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

  @ApiProperty({ type: [CreateTripRouteItemRequestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteItemRequestDto)
  items: CreateTripRouteItemRequestDto[];
}
