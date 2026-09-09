import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const userRepository = {
    findOne: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('rejects a nickname outside the allowed length', async () => {
    await expect(service.updateNickName(1, 'a')).rejects.toMatchObject({
      code: ErrorCode.BAD_REQUEST,
    });
  });

  it('rejects a duplicate nickname', async () => {
    userRepository.findOne
      .mockResolvedValueOnce({ id: 1, nickName: '현재닉네임' })
      .mockResolvedValueOnce({ id: 2, nickName: '중복닉네임' });

    await expect(service.updateNickName(1, '중복닉네임')).rejects.toMatchObject(
      {
        code: ErrorCode.DUPLICATE_RESOURCE,
      },
    );
  });

  it('keeps the existing not-found behavior for nickname updates', async () => {
    userRepository.findOne.mockResolvedValueOnce(null);

    await expect(service.updateNickName(1, '새닉네임')).rejects.toMatchObject({
      code: ErrorCode.BAD_REQUEST,
    });
  });

  it('returns the active user profile with its public fallback nickname', async () => {
    const createdAt = new Date('2026-09-01T00:00:00.000Z');
    userRepository.findOne.mockResolvedValue({
      id: 1,
      email: null,
      nickName: null,
      provider: AuthProvider.GOOGLE,
      createdAt,
    });

    await expect(service.getProfile(1)).resolves.toEqual({
      id: 1,
      email: null,
      nickName: '탈퇴한 혼여족',
      provider: AuthProvider.GOOGLE,
      createdAt,
    });
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1, isDeleted: false },
    });
  });

  it('rejects a profile request for a missing active user', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(service.getProfile(1)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
  });

  it('does not write when the trimmed nickname is unchanged', async () => {
    userRepository.findOne.mockResolvedValue({ id: 1, nickName: '혼여족' });

    await expect(service.updateNickName(1, '  혼여족  ')).resolves.toEqual({
      ok: true,
    });
    expect(userRepository.update).not.toHaveBeenCalled();
  });

  it('trims and persists an available nickname', async () => {
    userRepository.findOne
      .mockResolvedValueOnce({ id: 1, nickName: '기존닉네임' })
      .mockResolvedValueOnce(null);

    await expect(service.updateNickName(1, '  새닉네임  ')).resolves.toEqual({
      ok: true,
    });
    expect(userRepository.update).toHaveBeenCalledWith(1, {
      nickName: '새닉네임',
    });
  });

  it('queries findById with the active-user condition', async () => {
    const user = { id: 1, isDeleted: false };
    userRepository.findOne.mockResolvedValue(user);

    await expect(service.findById(1)).resolves.toBe(user);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1, isDeleted: false },
    });
  });

  it('updates and clears refresh tokens without changing other profile fields', async () => {
    await service.updateRefreshToken(1, 'hashed-refresh-token');
    await service.clearRefreshToken(1);

    expect(userRepository.update).toHaveBeenNthCalledWith(1, 1, {
      refreshToken: 'hashed-refresh-token',
    });
    expect(userRepository.update).toHaveBeenNthCalledWith(2, 1, {
      refreshToken: null,
    });
  });

  it('soft-deletes a user and clears private credentials', async () => {
    await service.withdraw(1);

    expect(userRepository.update).toHaveBeenCalledWith(1, {
      isDeleted: true,
      refreshToken: null,
      email: null,
      nickName: null,
    });
  });
});
