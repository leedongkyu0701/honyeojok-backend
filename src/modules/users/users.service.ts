import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { UserProfileResponseDto } from './dto/response/user-profile.response.dto';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id, isDeleted: false } });
  }

  async findByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { provider, providerId, isDeleted: false },
    });
    return user;
  }

  async findDeletedByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { provider, providerId, isDeleted: true },
    });
  }

  async findByNickName(nickName: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { nickName, isDeleted: false },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async compareRefreshToken(
    plainToken: string,
    hashedToken: string,
  ): Promise<boolean> {
    return argon2.verify(hashedToken, plainToken);
  }

  async updateRefreshToken(
    userId: number,
    hashedRefreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async clearRefreshToken(userId: number): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  async getProfile(userId: number): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    return {
      id: user.id,
      email: user.email ?? null,
      nickName: user.nickName ?? '탈퇴한 혼여족',
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }

  async updateNickName(
    userId: number,
    newNickName: string,
  ): Promise<{ ok: true }> {
    const nickName = newNickName.trim();

    if (nickName.length < 2 || nickName.length > 12) {
      throw BaseException.badRequest(
        'NickName length must be 2~12',
        ErrorCode.BAD_REQUEST,
      );
    }

    const me = await this.userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!me) {
      throw BaseException.badRequest('User not found', ErrorCode.BAD_REQUEST);
    }

    if (me.nickName === nickName) {
      return { ok: true };
    }

    const exists = await this.userRepository.findOne({
      where: { nickName, isDeleted: false },
    });

    if (exists && exists.id !== userId) {
      throw BaseException.conflict(
        'NickName already exists',
        ErrorCode.DUPLICATE_RESOURCE,
      );
    }

    await this.userRepository.update(userId, { nickName });

    return { ok: true };
  }

  async withdraw(userId: number): Promise<void> {
    await this.userRepository.update(userId, {
      isDeleted: true,
      refreshToken: null,
      email: null,
      nickName: null,
    });
  }
}
