import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content: string;

  // 대댓글이면 부모 댓글 id, 최상위면 없음
  @IsOptional()
  @IsInt()
  parentId?: number;
}
