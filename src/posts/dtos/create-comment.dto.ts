import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  content: string;

  // 대댓글이면 부모 댓글 id, 최상위면 없음
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  parentId?: number;
}
