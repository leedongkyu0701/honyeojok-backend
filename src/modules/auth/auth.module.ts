import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { OriginGuard } from './guards/origin.guard';
import { RoleGuard } from './guards/role.guard';
import { JwtOptionalGuard } from './guards/jwt-optional.guard';

@Global()
@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAccessGuard,
    JwtRefreshGuard,
    JwtOptionalGuard,
    OriginGuard,
    RoleGuard,
  ],
  controllers: [AuthController],
  exports: [
    JwtAccessGuard,
    JwtRefreshGuard,
    JwtOptionalGuard,
    OriginGuard,
    RoleGuard,
  ],
})
export class AuthModule {}
