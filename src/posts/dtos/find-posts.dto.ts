import { IsEnum, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PostType } from 'src/types/post';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindPostsQuery {
  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, maximum: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
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
}
