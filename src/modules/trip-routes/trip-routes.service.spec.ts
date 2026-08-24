import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TripRoutesService } from './trip-routes.service';
import { Bookmark } from './entities/bookmark.entity';
import { TripRoute } from './entities/trip-route.entity';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { SpotsService } from 'src/modules/spots/spots.service';
import { User } from 'src/modules/users/entities/user.entity';

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
        { provide: SpotsService, useValue: {} },
      ],
    }).compile();

    service = module.get<TripRoutesService>(TripRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
