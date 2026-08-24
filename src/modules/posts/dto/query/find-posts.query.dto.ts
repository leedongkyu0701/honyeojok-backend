import { IsEnum, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from 'src/modules/posts/enums/post-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProvinceGroup } from 'src/modules/destinations/enums/province-group.enum';

export class FindPostsQuery {
  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  take: number = 10;

  @ApiPropertyOptional({ enum: PostType })
  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: ProvinceGroup })
  @IsOptional()
  @IsEnum(ProvinceGroup)
  province?: ProvinceGroup;
}
