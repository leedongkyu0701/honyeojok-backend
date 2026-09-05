import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DestinationsService } from './destinations.service';
import { Destination } from './entities/destination.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { RedisCacheService } from 'src/infrastructure/cache/redis/redis-cache.service';
import {
  DESTINATIONS_MAP_CACHE_KEY,
  DESTINATIONS_MAP_CACHE_TTL_SECONDS,
} from './destinations.service';
import { ProvinceGroup } from './enums/province-group.enum';
import type { CreateDestinationRequestDto } from './dto/request/create-destination.request.dto';

describe('DestinationsService', () => {
  let service: DestinationsService;
  const destinationRepository = {
    find: jest.fn(),
    manager: {
      transaction: jest.fn(),
    },
  };
  const redisCacheService = {
    getJson: jest.fn(),
    setJson: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationsService,
        {
          provide: getRepositoryToken(Destination),
          useValue: destinationRepository,
        },
        { provide: getRepositoryToken(TripRoute), useValue: {} },
        { provide: getRepositoryToken(Spot), useValue: {} },
        { provide: RedisCacheService, useValue: redisCacheService },
      ],
    }).compile();

    service = module.get<DestinationsService>(DestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns the map result from Redis without querying the repository on a cache hit', async () => {
    const cached = [
      {
        id: 1,
        slug: 'jeju',
        name: '제주',
        score: 4.7,
        summary: '혼자 여행하기 좋은 섬',
        latitude: 33.4996,
        longitude: 126.5312,
        tagSlugs: ['ocean'],
      },
    ];
    redisCacheService.getJson.mockResolvedValue(cached);

    await expect(service.findMap()).resolves.toEqual(cached);
    expect(destinationRepository.find).not.toHaveBeenCalled();
    expect(redisCacheService.setJson).not.toHaveBeenCalled();
  });

  it('queries the repository and caches the map result on a cache miss', async () => {
    const destination = {
      id: 1,
      slug: 'jeju',
      name: '제주',
      score: 4.7,
      summary: '혼자 여행하기 좋은 섬',
      latitude: 33.4996,
      longitude: 126.5312,
      tags: [{ slug: 'ocean' }],
    } as Destination;
    const expected = [
      {
        id: 1,
        slug: 'jeju',
        name: '제주',
        score: 4.7,
        summary: '혼자 여행하기 좋은 섬',
        latitude: 33.4996,
        longitude: 126.5312,
        tagSlugs: ['ocean'],
      },
    ];
    redisCacheService.getJson.mockResolvedValue(null);
    destinationRepository.find.mockResolvedValue([destination]);

    await expect(service.findMap()).resolves.toEqual(expected);
    expect(destinationRepository.find).toHaveBeenCalledWith({
      select: [
        'id',
        'slug',
        'name',
        'latitude',
        'longitude',
        'score',
        'summary',
      ],
      relations: ['tags'],
    });
    expect(redisCacheService.setJson).toHaveBeenCalledWith(
      DESTINATIONS_MAP_CACHE_KEY,
      expected,
      DESTINATIONS_MAP_CACHE_TTL_SECONDS,
    );
  });

  it('invalidates the map cache after the destination transaction commits', async () => {
    const savedDestination = { id: 1 } as Destination;
    let commitTransaction: (destination: Destination) => void;
    const transactionResult = new Promise<Destination>((resolve) => {
      commitTransaction = resolve;
    });
    destinationRepository.manager.transaction.mockReturnValue(
      transactionResult,
    );
    const dto: CreateDestinationRequestDto = {
      slug: 'jeju',
      name: '제주',
      province: ProvinceGroup.JEJU,
      score: 4.7,
      rank: 1,
      latitude: 33.4996,
      longitude: 126.5312,
      summary: '혼자 여행하기 좋은 섬',
      description: '설명',
      food: 6,
      transport: 7,
      safety: 8,
      loneliness: 3,
    };

    const result = service.createOne(dto);

    expect(destinationRepository.manager.transaction).toHaveBeenCalledTimes(1);
    expect(redisCacheService.delete).not.toHaveBeenCalled();

    commitTransaction!(savedDestination);

    await expect(result).resolves.toBe(savedDestination);
    expect(redisCacheService.delete).toHaveBeenCalledWith(
      DESTINATIONS_MAP_CACHE_KEY,
    );
  });
});
