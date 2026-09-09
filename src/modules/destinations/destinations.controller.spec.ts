import { Test, TestingModule } from '@nestjs/testing';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

describe('DestinationsController', () => {
  let controller: DestinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinationsController],
      providers: [
        { provide: DestinationsService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: vi.fn() } },
        { provide: RoleGuard, useValue: { canActivate: vi.fn() } },
      ],
    }).compile();

    controller = module.get<DestinationsController>(DestinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
