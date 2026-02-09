import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  // slug: 영문/숫자/하이픈만 (프론트/URL/DB 안정)
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must be lowercase words separated by hyphen (e.g. sea, night-view)',
  })
  slug: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  label: string;
}
