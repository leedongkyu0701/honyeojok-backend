import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';

export class FindSpotsQuery {
  @ApiPropertyOptional({ enum: SpotCategory })
  @IsOptional()
  @IsEnum(SpotCategory)
  category?: SpotCategory;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 8, default: 8, maximum: 8 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(8)
  take: number = 8;
}
