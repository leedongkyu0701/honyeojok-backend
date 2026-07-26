import { Test, TestingModule } from '@nestjs/testing';
import { TripRoutesController } from './trip-routes.controller';
import { TripRoutesService } from './trip-routes.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';
import { RoleGuard } from '../auth/guards/role.guard';

describe('TripRoutesController', () => {
  let controller: TripRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripRoutesController],
      providers: [
        { provide: TripRoutesService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: jest.fn() } },
        { provide: JwtOptionalGuard, useValue: { canActivate: jest.fn() } },
        { provide: RoleGuard, useValue: { canActivate: jest.fn() } },
      ],
    }).compile();

    controller = module.get<TripRoutesController>(TripRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
