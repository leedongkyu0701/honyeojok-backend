import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateNicknameRequestDto } from './dto/request/update-nickname.request.dto';
import { UserProfileResponseDto } from './dto/response/user-profile.response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAccessGuard)
  @Get('me')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiBearerAuth('access-token')
  getProfile(@CurrentUser() user: JwtUser): Promise<UserProfileResponseDto> {
    return this.userService.getProfile(user.id);
  }

  @UseGuards(JwtAccessGuard)
  @Patch('me/nickname')
  @ApiOperation({ summary: '내 닉네임 변경' })
  @ApiBearerAuth('access-token')
  async updateNickname(
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateNicknameRequestDto,
  ): Promise<{ ok: true }> {
    return this.userService.updateNickName(user.id, dto.nickName);
  }
}
