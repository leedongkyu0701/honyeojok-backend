import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DestinationsService } from './destinations.service';
import { Destination } from './entities/destination.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';

describe('DestinationsService', () => {
  let service: DestinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationsService,
        { provide: getRepositoryToken(Destination), useValue: {} },
        { provide: getRepositoryToken(TripRoute), useValue: {} },
        { provide: getRepositoryToken(Spot), useValue: {} },
      ],
    }).compile();

    service = module.get<DestinationsService>(DestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
