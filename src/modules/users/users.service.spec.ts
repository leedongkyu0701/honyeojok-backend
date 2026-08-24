import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const userRepository = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
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
