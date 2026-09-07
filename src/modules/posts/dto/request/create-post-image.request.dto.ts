import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostImageRequestDto {
  @IsUUID('4')
  uploadId: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  caption?: string;
}
