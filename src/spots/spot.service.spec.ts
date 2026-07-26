import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpotService } from './spot.service';
import { Spot } from './spot.entity';
import { Destination } from '../destinations/destination.entity';

describe('SpotService', () => {
  let service: SpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotService,
        { provide: getRepositoryToken(Spot), useValue: {} },
        { provide: getRepositoryToken(Destination), useValue: {} },
      ],
    }).compile();

    service = module.get<SpotService>(SpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
