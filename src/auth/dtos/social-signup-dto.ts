// auth/dto/social-login.dto.ts
import { IsEnum, IsString, IsEmail, IsOptional } from 'class-validator';
import { AuthProvider } from 'src/types/user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SocialLoginDto {
  @ApiProperty({ enum: AuthProvider })
  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string | null;
}
