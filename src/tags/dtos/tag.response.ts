import { ApiProperty } from '@nestjs/swagger';

export class TagResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  label: string;
}
