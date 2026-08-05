import { IsEnum, IsOptional, IsNumber, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import { Type } from 'class-transformer';

export class GetNearbySpotsQueryDto {
  @ApiPropertyOptional({
    description: '검색 반경 (km)',
    example: 5,
    default: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  @Max(10)
  radiusKm?: number;

  @ApiPropertyOptional({
    description: '스팟 카테고리 필터',
    example: [SpotCategory.FOOD, SpotCategory.CAFE],
    enum: SpotCategory,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(SpotCategory, { each: true })
  categories?: SpotCategory[];

  @ApiPropertyOptional({
    description: '카테고리별 최대 개수',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(10)
  @IsNumber()
  limit?: number;
}
