import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ProvinceGroup } from 'src/types/destination';

export class FindDestinationsQuery {
  @ApiPropertyOptional({ enum: ProvinceGroup })
  @IsOptional()
  @IsEnum(ProvinceGroup)
  province?: ProvinceGroup;

  @ApiPropertyOptional({
    enum: ['rank', 'score'],
    description: '정렬 기준',
  })
  @IsOptional()
  @IsIn(['rank', 'score'])
  sort?: 'rank' | 'score';

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 12, default: 12, maximum: 12 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(12)
  take: number = 12;
}
