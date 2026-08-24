import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { OriginGuard } from './guards/origin.guard';
import { appConfig } from 'src/config/app.config';
import { authConfig } from 'src/config/auth.config';
import { AuthCookieService } from './auth-cookie.service';
import { OAuthStateService } from './oauth/oauth-state.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: appConfig.KEY, useValue: {} },
        { provide: authConfig.KEY, useValue: {} },
        { provide: AuthCookieService, useValue: {} },
        { provide: OAuthStateService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: jest.fn() } },
        { provide: JwtRefreshGuard, useValue: { canActivate: jest.fn() } },
        { provide: OriginGuard, useValue: { canActivate: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
