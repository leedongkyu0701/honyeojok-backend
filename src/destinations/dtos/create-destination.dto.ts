// src/destinations/dto/create-destination.dto.ts
import { IsString, IsNumber } from 'class-validator';
import { ProvinceGroup } from 'src/types/destination';
import { ApiProperty } from '@nestjs/swagger';
import { ImageSource } from 'src/types/destination';

export class CreateDestinationDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  province: ProvinceGroup;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  imageSource?: ImageSource;

  @ApiProperty()
  @IsString()
  imageCredit?: string;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNumber()
  reviewCount: number;

  @ApiProperty()
  @IsNumber()
  rank: number;

  @ApiProperty()
  @IsNumber()
  food: number;

  @ApiProperty()
  @IsNumber()
  transport: number;

  @ApiProperty()
  @IsNumber()
  safety: number;

  @ApiProperty()
  @IsNumber()
  loneliness: number;
}
