import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpotsService } from './spots.service';
import { Spot } from './entities/spot.entity';
import { Destination } from 'src/modules/destinations/entities/destination.entity';

describe('SpotsService', () => {
  let service: SpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotsService,
        { provide: getRepositoryToken(Spot), useValue: {} },
        { provide: getRepositoryToken(Destination), useValue: {} },
      ],
    }).compile();

    service = module.get<SpotsService>(SpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
