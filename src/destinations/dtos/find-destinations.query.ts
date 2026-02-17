import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  // ArrayUnique,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
  // ArrayMaxSize,
} from 'class-validator';
import { ProvinceGroup } from 'src/types/destination';
// import { TagGroup } from 'src/types/tag';

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

  // @ApiPropertyOptional({
  //   enum: TagGroup,
  //   isArray: true,
  //   example: ['healing', 'sea'],
  //   description: '최대 3개. tags 배열',
  // })
  // @IsOptional()
  // @Transform(({ value }) =>
  //   Array.isArray(value) ? value : value ? [value] : undefined,
  // )
  // @IsEnum(TagGroup, { each: true })
  // @ArrayUnique()
  // @ArrayMaxSize(3)
  // tags?: TagGroup[];

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
