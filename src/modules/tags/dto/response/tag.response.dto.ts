import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  label: string;
}
