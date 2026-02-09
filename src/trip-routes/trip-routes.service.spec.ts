import { Test, TestingModule } from '@nestjs/testing';
import { TripRoutesService } from './trip-routes.service';

describe('TripRoutesService', () => {
  let service: TripRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripRoutesService],
    }).compile();

    service = module.get<TripRoutesService>(TripRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
