import {
  Controller,
  Post,
  Req,
  Res,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { AuthProvider, type JwtUser } from 'src/types/user';
import { SocialLoginDto } from './dtos/social-signup-dto';
import {
  verifyOAuthStateOrThrow,
  generateOAuthState,
  setOAuthStateCookie,
} from './oauth/oauth-state.util';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { getRefreshCookieOptions } from './cookies';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { OriginGuard } from './guards/origin.guard';

interface CookieRequest extends Request {
  cookies: { [key: string]: string };
}

@ApiTags('Auth')
@Throttle({ auth: { ttl: 60, limit: 10 } })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private get frontendOrigin(): string {
    return this.configService.getOrThrow('FRONTEND_ORIGIN');
  }

  @Get('kakao')
  @ApiOperation({ summary: 'Kakao OAuth 로그인 요청(302 Redirect)' })
  kakaoLogin(@Res() res: Response) {
    const CLIENT_ID = this.configService.getOrThrow<string>('KAKAO_CLIENT_ID');
    const REDIRECT_URI =
      this.configService.getOrThrow<string>('KAKAO_REDIRECT_URI');
    const state = generateOAuthState(); // CSRF 방지 위한 랜덤 문자열 생성
    setOAuthStateCookie(res, AuthProvider.KAKAO, state);
    const kakaoAuthURL =
      `https://kauth.kakao.com/oauth/authorize?response_type=code` +
      `&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;
    return res.redirect(kakaoAuthURL);
  }

  @Get('kakao/callback')
  @ApiOperation({ summary: 'Kakao OAuth 콜백 처리' })
  async kakaoCallback(
    @Query('code') code: string,
    @Query('state') _state: string,
    @Res() res: Response,
    @Req() req: CookieRequest,
  ) {
    try {
      verifyOAuthStateOrThrow(req, res, AuthProvider.KAKAO, _state);
      const tokens = await this.authService.kakaoAccessToken(code);
      const kakaoUser = await this.authService.kakaoUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginDto = {
        provider: AuthProvider.KAKAO,
        providerId: kakaoUser.id.toString(),
        email: kakaoUser.kakao_account?.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        getRefreshCookieOptions(this.configService),
      );

      // 토큰을 URL로 넘기지 말고, 프론트 리다이렉트 페이지에서 바로 refresh 토큰 쿠키 읽어서 액세스 토큰 재발급 요청하도록 했음.
      return res.redirect(`${this.frontendOrigin}/auth/social-login-callback`);
    } catch (error) {
      if (
        error instanceof BaseException &&
        error.code === ErrorCode.AUTH_WITHDRAWN_USER
      ) {
        return res.redirect(
          `${this.frontendOrigin}/auth/login?error=withdrawn_user`,
        );
      }
      return res.redirect(
        `${this.frontendOrigin}/auth/login?error=oauth_failed`,
      );
    }
  }

  @Get('google')
  @ApiOperation({ summary: 'Google OAuth 로그인 요청(302 Redirect)' })
  googleLogin(@Res() res: Response) {
    const CLIENT_ID = this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const REDIRECT_URI = this.configService.getOrThrow<string>(
      'GOOGLE_REDIRECT_URI',
    );
    const state = generateOAuthState();
    setOAuthStateCookie(res, AuthProvider.GOOGLE, state);

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const googleAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
      `&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}` +
      `&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent` +
      `&state=${state}`;

    return res.redirect(googleAuthURL);
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Google OAuth 콜백 처리' })
  async googleCallback(
    @Query('code') code: string,
    @Query('state') _state: string,
    @Res() res: Response,
    @Req() req: CookieRequest,
  ) {
    try {
      verifyOAuthStateOrThrow(req, res, AuthProvider.GOOGLE, _state);
      const tokens = await this.authService.googleAccessToken(code);
      const googleUser = await this.authService.googleUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginDto = {
        provider: AuthProvider.GOOGLE,
        providerId: googleUser.id,
        email: googleUser.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        getRefreshCookieOptions(this.configService),
      );

      return res.redirect(`${this.frontendOrigin}/auth/social-login-callback`);
    } catch (error) {
      if (
        error instanceof BaseException &&
        error.code === ErrorCode.AUTH_WITHDRAWN_USER
      ) {
        return res.redirect(
          `${this.frontendOrigin}/auth/login?error=withdrawn_user`,
        );
      }
      return res.redirect(
        `${this.frontendOrigin}/auth/login?error=oauth_failed`,
      );
    }
  }

  @Get('naver')
  @ApiOperation({ summary: 'Naver OAuth 로그인 요청(302 Redirect)' })
  naverLogin(@Res() res: Response) {
    const CLIENT_ID = this.configService.getOrThrow<string>('NAVER_CLIENT_ID');
    const REDIRECT_URI =
      this.configService.getOrThrow<string>('NAVER_REDIRECT_URI');
    const state = generateOAuthState();
    setOAuthStateCookie(res, AuthProvider.NAVER, state);
    const naverAuthURL =
      `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
      `&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;
    return res.redirect(naverAuthURL);
  }

  @Get('naver/callback')
  @ApiOperation({ summary: 'Naver OAuth 콜백 처리' })
  async naverCallback(
    @Query('code') code: string,
    @Query('state') _state: string,
    @Res() res: Response,
    @Req() req: CookieRequest,
  ) {
    try {
      verifyOAuthStateOrThrow(req, res, AuthProvider.NAVER, _state);
      const tokens = await this.authService.naverAccessToken(code);
      const naverUser = await this.authService.naverUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginDto = {
        provider: AuthProvider.NAVER,
        providerId: naverUser.response.id,
        email: naverUser.response.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        getRefreshCookieOptions(this.configService),
      );

      return res.redirect(`${this.frontendOrigin}/auth/social-login-callback`);
    } catch (error) {
      if (
        error instanceof BaseException &&
        error.code === ErrorCode.AUTH_WITHDRAWN_USER
      ) {
        return res.redirect(
          `${this.frontendOrigin}/auth/login?error=withdrawn_user`,
        );
      }
      return res.redirect(
        `${this.frontendOrigin}/auth/login?error=oauth_failed`,
      );
    }
  }

  @UseGuards(OriginGuard, JwtRefreshGuard)
  @Post('refresh-token')
  @ApiOperation({ summary: '리프레시 토큰 쿠키로 액세스 토큰 재발급' })
  @ApiCookieAuth('refreshToken')
  async refreshToken(
    @CurrentUser() user: JwtUser,
    @Req() req: CookieRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.cookies.refreshToken, req.headers.cookie);
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw BaseException.unauthorized(
        'No refresh token in cookies',
        ErrorCode.AUTH_REFRESH_INVALID,
      );
    }
    const tokens = await this.authService.refreshTokens(user.id, refreshToken);

    res.cookie(
      'refreshToken',
      tokens.refreshToken,
      getRefreshCookieOptions(this.configService),
    );

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(OriginGuard, JwtAccessGuard)
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth('access-token')
  async logout(
    @CurrentUser() user: JwtUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);
    res.clearCookie('refreshToken', { path: '/auth' });
    return { ok: true };
  }

  @UseGuards(JwtAccessGuard)
  @Post('withdraw')
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiBearerAuth('access-token')
  async withdraw(
    @CurrentUser() user: JwtUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.withdraw(user.id);
    res.clearCookie('refreshToken', { path: '/auth' });
    return { ok: true };
  }
}
