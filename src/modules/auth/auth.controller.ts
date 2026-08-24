import {
  Controller,
  Post,
  Req,
  Res,
  Get,
  Query,
  UseGuards,
  Inject,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import type { ConfigType } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { SocialLoginInput } from './types/social-login.input';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { OriginGuard } from './guards/origin.guard';
import { appConfig } from 'src/config/app.config';
import { authConfig } from 'src/config/auth.config';
import { AuthCookieService } from './auth-cookie.service';
import { OAuthStateService } from './oauth/oauth-state.service';

interface CookieRequest extends Request {
  cookies: { [key: string]: string };
}

@ApiTags('Auth')
@Throttle({ auth: { ttl: 60, limit: 10 } })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly authCookieService: AuthCookieService,
    private readonly oauthStateService: OAuthStateService,
  ) {}

  private get frontendOrigin(): string {
    return this.appConfiguration.frontendBaseUrl;
  }

  @Get('kakao')
  @ApiOperation({ summary: 'Kakao OAuth 로그인 요청(302 Redirect)' })
  kakaoLogin(@Res() res: Response) {
    const { clientId, redirectUri } = this.authConfiguration.oauth.kakao;
    const state = this.oauthStateService.generate();
    this.oauthStateService.setCookie(res, AuthProvider.KAKAO, state);
    const kakaoAuthURL =
      `https://kauth.kakao.com/oauth/authorize?response_type=code` +
      `&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
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
      this.oauthStateService.verifyOrThrow(
        req,
        res,
        AuthProvider.KAKAO,
        _state,
      );
      const tokens = await this.authService.kakaoAccessToken(code);
      const kakaoUser = await this.authService.kakaoUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginInput = {
        provider: AuthProvider.KAKAO,
        providerId: kakaoUser.id.toString(),
        email: kakaoUser.kakao_account?.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        this.authCookieService.getRefreshCookieOptions(),
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
    const { clientId, redirectUri } = this.authConfiguration.oauth.google;
    const state = this.oauthStateService.generate();
    this.oauthStateService.setCookie(res, AuthProvider.GOOGLE, state);

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const googleAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
      `&client_id=${clientId}&redirect_uri=${redirectUri}` +
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
      this.oauthStateService.verifyOrThrow(
        req,
        res,
        AuthProvider.GOOGLE,
        _state,
      );
      const tokens = await this.authService.googleAccessToken(code);
      const googleUser = await this.authService.googleUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginInput = {
        provider: AuthProvider.GOOGLE,
        providerId: googleUser.id,
        email: googleUser.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        this.authCookieService.getRefreshCookieOptions(),
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
    const { clientId, redirectUri } = this.authConfiguration.oauth.naver;
    const state = this.oauthStateService.generate();
    this.oauthStateService.setCookie(res, AuthProvider.NAVER, state);
    const naverAuthURL =
      `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
      `&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
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
      this.oauthStateService.verifyOrThrow(
        req,
        res,
        AuthProvider.NAVER,
        _state,
      );
      const tokens = await this.authService.naverAccessToken(code);
      const naverUser = await this.authService.naverUserInfo(
        tokens.access_token,
      );

      const dto: SocialLoginInput = {
        provider: AuthProvider.NAVER,
        providerId: naverUser.response.id,
        email: naverUser.response.email ?? null,
      };

      const { refreshToken } = await this.authService.socialLogin(dto);

      res.cookie(
        'refreshToken',
        refreshToken,
        this.authCookieService.getRefreshCookieOptions(),
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
      this.authCookieService.getRefreshCookieOptions(),
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
    res.clearCookie(
      'refreshToken',
      this.authCookieService.getRefreshCookieClearOptions(),
    );
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
    res.clearCookie(
      'refreshToken',
      this.authCookieService.getRefreshCookieClearOptions(),
    );
    return { ok: true };
  }
}
