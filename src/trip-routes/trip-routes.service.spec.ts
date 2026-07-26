import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TripRoutesService } from './trip-routes.service';
import { Bookmark } from './bookmark.entity';
import { TripRoute } from './trip-route.entity';
import { Destination } from '../destinations/destination.entity';
import { SpotService } from '../spots/spot.service';
import { User } from '../user/user.entity';

describe('TripRoutesService', () => {
  let service: TripRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripRoutesService,
        { provide: getRepositoryToken(TripRoute), useValue: {} },
        { provide: getRepositoryToken(Destination), useValue: {} },
        { provide: getRepositoryToken(Bookmark), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: DataSource, useValue: {} },
        { provide: SpotService, useValue: {} },
      ],
    }).compile();

    service = module.get<TripRoutesService>(TripRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
