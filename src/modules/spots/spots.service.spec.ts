import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import type { CreateSpotRequestDto } from './dto/request/create-spot.request.dto';
import type { FindSpotsQuery } from './dto/query/find-spots.query.dto';
import { SpotCategory } from './enums/spot-category.enum';
import { Spot } from './entities/spot.entity';
import { SpotsService } from './spots.service';

function createSpot(overrides: Partial<Spot> = {}): Spot {
  return {
    id: 1,
    slug: 'seoul-cafe',
    name: '서울 카페',
    summary: '혼자 쉬기 좋은 카페',
    category: SpotCategory.CAFE,
    description: '설명',
    isRecommended: false,
    destinationId: 10,
    destination: { id: 10, slug: 'seoul', name: '서울' } as Destination,
    tags: [],
    ...overrides,
  } as Spot;
}

describe('SpotsService', () => {
  let service: SpotsService;
  const queryBuilder = {
    innerJoinAndSelect: vi.fn(),
    leftJoinAndSelect: vi.fn(),
    select: vi.fn(),
    where: vi.fn(),
    andWhere: vi.fn(),
    orderBy: vi.fn(),
    addOrderBy: vi.fn(),
    skip: vi.fn(),
    take: vi.fn(),
    distinct: vi.fn(),
    getManyAndCount: vi.fn(),
    getMany: vi.fn(),
  };
  const spotRepository = {
    createQueryBuilder: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    manager: { transaction: vi.fn() },
  };
  const destinationRepository = { findOne: vi.fn() };
  const transactionSpotRepository = { create: vi.fn(), save: vi.fn() };
  const transactionDestinationRepository = { findOne: vi.fn() };
  const transactionTagRepository = { find: vi.fn() };
  const transactionManager = { getRepository: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();
    Object.values(queryBuilder).forEach((mock) => {
      if (
        mock !== queryBuilder.getManyAndCount &&
        mock !== queryBuilder.getMany
      )
        mock.mockReturnValue(queryBuilder);
    });
    spotRepository.createQueryBuilder.mockReturnValue(queryBuilder);
    spotRepository.manager.transaction.mockImplementation(
      (callback: (manager: typeof transactionManager) => Promise<unknown>) =>
        callback(transactionManager),
    );
    transactionManager.getRepository.mockImplementation((entity) => {
      if (entity === Spot) return transactionSpotRepository;
      if (entity === Destination) return transactionDestinationRepository;
      return transactionTagRepository;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotsService,
        { provide: getRepositoryToken(Spot), useValue: spotRepository },
        {
          provide: getRepositoryToken(Destination),
          useValue: destinationRepository,
        },
      ],
    }).compile();

    service = module.get<SpotsService>(SpotsService);
  });

  it('rejects a query for an unknown region before building a spot query', async () => {
    destinationRepository.findOne.mockResolvedValue(null);

    await expect(
      service.findByQuery({} as FindSpotsQuery, 'unknown'),
    ).rejects.toMatchObject({
      code: ErrorCode.BAD_REQUEST,
    });
    expect(spotRepository.createQueryBuilder).not.toHaveBeenCalled();
  });

  it.each([
    [{ page: 0, take: 0 }, 0, 1],
    [{ page: -4, take: 99 }, 0, 8],
  ])('normalizes page and take limits for %o', async (query, skip, take) => {
    destinationRepository.findOne.mockResolvedValue({ id: 10, slug: 'seoul' });
    queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

    await expect(service.findByQuery(query, 'seoul')).resolves.toEqual({
      data: [],
      totalPages: 1,
    });

    expect(queryBuilder.skip).toHaveBeenCalledWith(skip);
    expect(queryBuilder.take).toHaveBeenCalledWith(take);
  });

  it('applies category, pagination, deterministic ordering, and card mapping', async () => {
    const spot = createSpot({ category: SpotCategory.FOOD });
    destinationRepository.findOne.mockResolvedValue({ id: 10, slug: 'seoul' });
    queryBuilder.getManyAndCount.mockResolvedValue([[spot], 7]);

    await expect(
      service.findByQuery(
        { page: 2, take: 3, category: SpotCategory.FOOD },
        'seoul',
      ),
    ).resolves.toMatchObject({
      totalPages: 3,
      data: [{ id: spot.id, category: SpotCategory.FOOD }],
    });

    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      'spot.category = :category',
      { category: SpotCategory.FOOD },
    );
    expect(queryBuilder.orderBy).toHaveBeenCalledWith(
      'spot.isRecommended',
      'DESC',
    );
    expect(queryBuilder.addOrderBy).toHaveBeenCalledWith('spot.id', 'DESC');
    expect(queryBuilder.skip).toHaveBeenCalledWith(3);
    expect(queryBuilder.take).toHaveBeenCalledWith(3);
  });

  it('groups hot spots by category using the configured per-category limit', async () => {
    spotRepository.find.mockImplementation(
      (options: { where: { category: SpotCategory } }) =>
        Promise.resolve([createSpot({ category: options.where.category })]),
    );

    const result = await service.findHot(2);

    expect(spotRepository.find).toHaveBeenCalledTimes(6);
    expect(spotRepository.find).toHaveBeenCalledWith({
      where: { category: SpotCategory.FOOD },
      relations: ['destination', 'tags'],
      order: { isRecommended: 'DESC', id: 'DESC' },
      take: 2,
    });
    expect(result.food[0]).toMatchObject({ category: SpotCategory.FOOD });
    expect(result.nature[0]).toMatchObject({ category: SpotCategory.NATURE });
    expect(result.etc[0]).toMatchObject({ category: SpotCategory.ETC });
  });

  it('returns at most 50 recommended spots with their mapping dependencies', async () => {
    const spot = createSpot({ isRecommended: true });
    spotRepository.find.mockResolvedValue([spot]);

    await expect(service.findRecommended()).resolves.toMatchObject([
      { id: spot.id, destination: { slug: 'seoul' } },
    ]);
    expect(spotRepository.find).toHaveBeenCalledWith({
      where: { isRecommended: true },
      relations: ['destination', 'tags'],
      order: { id: 'DESC' },
      take: 50,
    });
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects an invalid spot id: %s',
    async (id) => {
      await expect(service.findById(id)).rejects.toMatchObject({
        code: ErrorCode.BAD_REQUEST,
      });
      expect(spotRepository.findOne).not.toHaveBeenCalled();
    },
  );

  it('distinguishes a missing spot from a mapped spot detail', async () => {
    spotRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.findById(99)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });

    const spot = createSpot({ description: '상세 설명' });
    spotRepository.findOne.mockResolvedValueOnce(spot);
    await expect(service.findById(1)).resolves.toMatchObject({
      id: 1,
      description: '상세 설명',
      destination: { slug: 'seoul' },
    });
  });

  it('uses default food/cafe/drink categories, excludes route spots, and keeps nearest candidates per category', async () => {
    queryBuilder.getMany.mockResolvedValue([
      createSpot({
        id: 1,
        category: SpotCategory.FOOD,
        lat: 37.5,
        lng: 127.0,
      }),
      createSpot({
        id: 2,
        category: SpotCategory.FOOD,
        lat: 37.51,
        lng: 127.0,
      }),
      createSpot({
        id: 3,
        category: SpotCategory.CAFE,
        lat: 37.505,
        lng: 127.0,
      }),
      createSpot({
        id: 4,
        category: SpotCategory.DRINK,
        lat: 37.6,
        lng: 127.0,
      }),
      createSpot({ id: 5, category: SpotCategory.DRINK }),
    ]);

    await expect(
      service.findNearbyByPoints({
        destinationId: 10,
        points: [{ lat: 37.5, lng: 127.0 }],
        radiusKm: 3,
        limit: 1,
        excludeSpotIds: [9],
      }),
    ).resolves.toEqual({
      [SpotCategory.FOOD]: [expect.objectContaining({ id: 1, minDistance: 0 })],
      [SpotCategory.CAFE]: [expect.objectContaining({ id: 3 })],
      [SpotCategory.DRINK]: [],
    });

    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      's.category IN (:...cats)',
      { cats: [SpotCategory.FOOD, SpotCategory.CAFE, SpotCategory.DRINK] },
    );
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      's.id NOT IN (:...excludeSpotIds)',
      { excludeSpotIds: [9] },
    );
  });

  it('honors explicitly requested nearby categories instead of the defaults', async () => {
    queryBuilder.getMany.mockResolvedValue([]);

    await expect(
      service.findNearbyByPoints({
        destinationId: 10,
        points: [{ lat: 37.5, lng: 127.0 }],
        radiusKm: 2,
        categories: [SpotCategory.NATURE],
        limit: 2,
      }),
    ).resolves.toEqual({ [SpotCategory.NATURE]: [] });

    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      's.category IN (:...cats)',
      { cats: [SpotCategory.NATURE] },
    );
  });

  it('rejects spot creation when its destination is missing', async () => {
    transactionDestinationRepository.findOne.mockResolvedValue(null);

    await expect(
      service.createOne({
        name: '새 스팟',
        slug: 'new-spot',
        summary: '요약',
        description: '설명',
        destinationSlug: 'unknown',
      } as unknown as CreateSpotRequestDto),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
  });

  it('creates an untagged spot with ETC and false recommendation defaults', async () => {
    const destination = { id: 10, slug: 'seoul' } as Destination;
    transactionDestinationRepository.findOne.mockResolvedValue(destination);
    const createdSpot = createSpot({ destination, tags: [] });
    transactionSpotRepository.create.mockReturnValue(createdSpot);
    transactionSpotRepository.save.mockResolvedValue(createdSpot);

    const result = await service.createOne({
      name: '새 스팟',
      slug: 'new-spot',
      summary: '요약',
      description: '설명',
      destinationSlug: 'seoul',
    } as CreateSpotRequestDto);

    expect(transactionSpotRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        category: SpotCategory.ETC,
        isRecommended: false,
        destination,
      }),
    );
    expect(result.tags).toEqual([]);
    expect(transactionTagRepository.find).not.toHaveBeenCalled();
  });

  it('rejects creation when any requested tag slug is unknown', async () => {
    transactionDestinationRepository.findOne.mockResolvedValue({
      id: 10,
      slug: 'seoul',
    });
    transactionTagRepository.find.mockResolvedValue([
      { id: 1, slug: 'food' } as Tag,
    ]);

    await expect(
      service.createOne({
        name: '새 스팟',
        slug: 'new-spot',
        summary: '요약',
        description: '설명',
        destinationSlug: 'seoul',
        tagSlugs: ['food', 'cafe'] as never,
      } as unknown as CreateSpotRequestDto),
    ).rejects.toThrow('Invalid tag slugs: cafe');
  });
});
