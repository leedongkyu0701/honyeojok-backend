import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import type { ConfigType } from '@nestjs/config';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { authConfig } from 'src/config/auth.config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly userService: UsersService,
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.accessSecret,
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
