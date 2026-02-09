import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthProvider } from 'src/types/user';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
    role: string;
    provider: AuthProvider;
  }) {
    const user = await this.userService.findById(payload.sub);

    if (!user || user.isDeleted) {
      throw BaseException.unauthorized(
        'Unauthorized',
        ErrorCode.AUTH_UNAUTHORIZED,
      );
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      provider: user.provider,
    };
  }
}
