import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { CreateTripRouteItemRequestDto } from './create-trip-route-item.request.dto';

export class CreateTripRouteDayRequestDto {
  @IsInt()
  @Min(1)
  dayNumber: number;

  @IsString()
  title: string;

  @IsString()
  note: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripRouteItemRequestDto)
  items: CreateTripRouteItemRequestDto[];
}
