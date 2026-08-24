import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateNicknameRequestDto {
  @ApiProperty({ example: '혼여족_1234567' })
  @IsString()
  @Length(2, 12)
  nickName: string;
}
