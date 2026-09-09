import { Test, TestingModule } from '@nestjs/testing';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

describe('SpotsController', () => {
  let controller: SpotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotsController],
      providers: [
        { provide: SpotsService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: vi.fn() } },
        { provide: RoleGuard, useValue: { canActivate: vi.fn() } },
      ],
    }).compile();

    controller = module.get<SpotsController>(SpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
