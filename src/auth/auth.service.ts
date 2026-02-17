import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import type {
  KakaoTokenResponse,
  KakaoUserResponse,
  GoogleTokenResponse,
  GoogleUserResponse,
  NaverTokenResponse,
  NaverUserResponse,
} from 'src/types/user';
import type { SocialLoginDto } from './dtos/social-signup-dto';
import { BaseException, ErrorCode } from '../common/exceptions/base.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async socialLogin(
    dto: SocialLoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!dto.provider || !dto.providerId) {
      throw BaseException.badRequest(
        'Invalid social login payload',
        ErrorCode.BAD_REQUEST,
      );
    }

    let user = await this.userService.findByProvider(
      dto.provider,
      dto.providerId,
    );

    if (!user) {
      const nickName = await this.generateUniqueNickName();

      // 여기서 DB 유니크 충돌이 나면 전역필터가 409(DUPLICATE_RESOURCE)로 처리
      user = await this.userService.createUser({
        email: dto.email ?? undefined,
        nickName,
        provider: dto.provider,
        providerId: dto.providerId,
      });
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async naverAccessToken(code: string): Promise<NaverTokenResponse> {
    const CLIENT_ID = this.configService.getOrThrow<string>('NAVER_CLIENT_ID');
    const CLIENT_SECRET = this.configService.getOrThrow<string>(
      'NAVER_CLIENT_SECRET',
    );
    const REDIRECT_URI =
      this.configService.getOrThrow<string>('NAVER_REDIRECT_URI');

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      throw new BaseException(
        'Naver OAuth configuration is missing',
        ErrorCode.OAUTH_CONFIG_MISSING,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    });

    const response = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Naver access token',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'naver', step: 'token', status: response.status },
      );
    }

    const data = (await response.json()) as NaverTokenResponse;
    if (!data.access_token) {
      throw BaseException.badRequest(
        'Invalid Naver token response',
        ErrorCode.OAUTH_FAILED,
      );
    }

    return data;
  }

  async naverUserInfo(accessToken: string): Promise<NaverUserResponse> {
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Naver user info',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'naver', step: 'user_info', status: response.status },
      );
    }

    const data = (await response.json()) as NaverUserResponse;
    if (!data.response?.id) {
      throw BaseException.badRequest(
        'Invalid Naver user response',
        ErrorCode.OAUTH_FAILED,
      );
    }

    return data;
  }

  async kakaoAccessToken(code: string): Promise<KakaoTokenResponse> {
    const CLIENT_ID = this.configService.getOrThrow<string>('KAKAO_CLIENT_ID');
    const CLIENT_SECRET = this.configService.getOrThrow<string>(
      'KAKAO_CLIENT_SECRET',
    );
    const REDIRECT_URI =
      this.configService.getOrThrow<string>('KAKAO_REDIRECT_URI');

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      throw new BaseException(
        'Kakao OAuth configuration is missing',
        ErrorCode.OAUTH_CONFIG_MISSING,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    });

    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Kakao access token',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'kakao', step: 'token', status: response.status },
      );
    }

    const data = (await response.json()) as KakaoTokenResponse;
    if (!data.access_token) {
      throw BaseException.badRequest(
        'Invalid Kakao token response',
        ErrorCode.OAUTH_FAILED,
      );
    }

    return data;
  }

  async kakaoUserInfo(accessToken: string): Promise<KakaoUserResponse> {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Kakao user info',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'kakao', step: 'user_info', status: response.status },
      );
    }

    const data = (await response.json()) as KakaoUserResponse;
    if (!data.id) {
      throw BaseException.badRequest(
        'Invalid Kakao user response',
        ErrorCode.OAUTH_FAILED,
      );
    }

    return data;
  }

  async googleAccessToken(
    code: string,
  ): Promise<{ access_token: string; id_token: string }> {
    const CLIENT_ID = this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const CLIENT_SECRET = this.configService.getOrThrow<string>(
      'GOOGLE_CLIENT_SECRET',
    );
    const REDIRECT_URI = this.configService.getOrThrow<string>(
      'GOOGLE_REDIRECT_URI',
    );

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      throw new BaseException(
        'Google OAuth configuration is missing',
        ErrorCode.OAUTH_CONFIG_MISSING,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const params = new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Google access token',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'google', step: 'token', status: response.status },
      );
    }

    const data = (await response.json()) as GoogleTokenResponse;
    if (!data.access_token || !data.id_token) {
      throw BaseException.badRequest(
        'Invalid Google token response',
        ErrorCode.OAUTH_FAILED,
      );
    }

    return { access_token: data.access_token, id_token: data.id_token };
  }

  async googleUserInfo(accessToken: string): Promise<GoogleUserResponse> {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new BaseException(
        'Failed to get Google user info',
        ErrorCode.OAUTH_FAILED,
        HttpStatus.BAD_GATEWAY,
        { provider: 'google', step: 'user_info', status: response.status },
      );
    }

    return (await response.json()) as GoogleUserResponse;
  }

  async logout(userId: number): Promise<void> {
    await this.userService.clearRefreshToken(userId);
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findById(userId);

    if (!user || user.isDeleted || !user.refreshToken) {
      throw BaseException.unauthorized(
        'Invalid user',
        ErrorCode.AUTH_UNAUTHORIZED,
      );
    }

    const isTokenValid = await this.userService.compareRefreshToken(
      refreshToken,
      user.refreshToken,
    );

    if (!isTokenValid) {
      throw BaseException.unauthorized(
        'Invalid refresh token',
        ErrorCode.AUTH_REFRESH_INVALID,
      );
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshPayload = { sub: user.id, role: user.role };
    const accessPayload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET_KEY'),
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET_KEY'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken, {
      type: argon2.argon2id,
      timeCost: 1, // ⬅ 기본값보다 낮춤
      memoryCost: 2 ** 16,
      parallelism: 1,
    });
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  private async generateUniqueNickName(): Promise<string> {
    const seed = '혼여족';
    const MAX_RETRY = 10;

    for (let i = 0; i < MAX_RETRY; i++) {
      const suffix = Math.floor(Math.random() * 10_000_000)
        .toString()
        .padStart(7, '0');

      const nickname = `${seed}_${suffix}`;
      const exists = await this.userService.findByNickName(nickname);

      if (!exists) return nickname;
    }

    return `혼여족_${Date.now()}`;
  }
}
