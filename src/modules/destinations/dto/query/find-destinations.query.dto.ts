import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ProvinceGroup } from 'src/modules/destinations/enums/province-group.enum';

export class FindDestinationsQuery {
  @IsOptional()
  @IsEnum(ProvinceGroup)
  province?: ProvinceGroup;

  /** 정렬 기준 */
  @IsOptional()
  @IsIn(['rank', 'score'])
  sort?: 'rank' | 'score';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(12)
  take: number = 12;
}
