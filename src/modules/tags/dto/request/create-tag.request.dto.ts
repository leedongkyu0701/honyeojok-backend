import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagRequestDto {
  @ApiProperty({ example: 'sea', description: '태그 슬러그' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must be lowercase words separated by hyphen (e.g. sea, night-view)',
  })
  slug: string;

  @ApiProperty({ example: '해변', description: '태그 라벨' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  label: string;
}
