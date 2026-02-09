import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthProvider } from 'src/types/user';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

interface RefreshRequest extends Request {
  cookies: {
    [key: string]: string;
  };
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RefreshRequest) => {
          const refreshToken = req.cookies?.refreshToken;
          if (!refreshToken) return null;
          return refreshToken;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: RefreshRequest,
    payload: { sub: number; role: string; provider: AuthProvider },
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      throw BaseException.unauthorized(
        'No refresh token',
        ErrorCode.AUTH_REFRESH_INVALID,
      );

    // 1️⃣ 유저 확인
    const user = await this.userService.findById(payload.sub);
    if (!user || user.isDeleted)
      throw BaseException.unauthorized(
        'Unauthorized',
        ErrorCode.AUTH_UNAUTHORIZED,
      );

    // 2️⃣ DB에 저장된 RefreshToken과 비교
    // (실무에서는 refresh token을 해시화해서 DB에 저장)
    if (!user.refreshToken)
      throw BaseException.unauthorized(
        'No refresh token in DB',
        ErrorCode.AUTH_REFRESH_INVALID,
      );
    const isTokenValid = await this.userService.compareRefreshToken(
      refreshToken,
      user.refreshToken, // DB에 저장된 해시
    );
    if (!isTokenValid)
      throw BaseException.unauthorized(
        'Invalid refresh token',
        ErrorCode.AUTH_REFRESH_INVALID,
      );

    // 3️⃣ payload 반환 → AuthGuard에서 req.user에 저장
    return { id: user.id, role: user.role, provider: user.provider };
  }
}
