import { Test, TestingModule } from '@nestjs/testing';
import { SpotController } from './spot.controller';
import { SpotService } from './spot.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../auth/guards/role.guard';

describe('SpotController', () => {
  let controller: SpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotController],
      providers: [
        { provide: SpotService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: jest.fn() } },
        { provide: RoleGuard, useValue: { canActivate: jest.fn() } },
      ],
    }).compile();

    controller = module.get<SpotController>(SpotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
