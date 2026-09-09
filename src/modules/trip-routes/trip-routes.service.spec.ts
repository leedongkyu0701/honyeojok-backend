import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import { SpotsService } from 'src/modules/spots/spots.service';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Bookmark } from './entities/bookmark.entity';
import { TripRouteDay } from './entities/trip-route-day.entity';
import { TripRouteItem } from './entities/trip-route-item.entity';
import { TripRoute } from './entities/trip-route.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { TripRoutesService } from './trip-routes.service';

function createRoute(overrides: Partial<TripRoute> = {}): TripRoute {
  return {
    id: 1,
    slug: 'seoul-one-day',
    title: '서울 하루 여행',
    summary: '요약',
    days: 1,
    bookmarkCount: 2,
    destinationId: 10,
    destination: { id: 10, slug: 'seoul', name: '서울' } as Destination,
    tags: [],
    daysPlan: [],
    ...overrides,
  } as TripRoute;
}

describe('TripRoutesService', () => {
  let service: TripRoutesService;
  const routeQueryBuilder = {
    leftJoinAndSelect: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    addOrderBy: vi.fn(),
    getOne: vi.fn(),
  };
  const tripRouteRepository = {
    find: vi.fn(),
    findOne: vi.fn(),
    createQueryBuilder: vi.fn(),
  };
  const destinationRepository = { findOne: vi.fn() };
  const bookmarkRepository = { exists: vi.fn() };
  const userRepository = {};
  const spotsService = { findNearbyByPoints: vi.fn() };
  const transactionDestinationRepository = { findOne: vi.fn() };
  const transactionTripRouteRepository = { create: vi.fn(), save: vi.fn() };
  const transactionDayRepository = { create: vi.fn(), save: vi.fn() };
  const transactionItemRepository = { create: vi.fn(), save: vi.fn() };
  const transactionTagRepository = { find: vi.fn() };
  const transactionSpotRepository = { find: vi.fn() };
  const transactionBookmarkRepository = { exists: vi.fn(), findOne: vi.fn() };
  const transactionManager = {
    getRepository: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    increment: vi.fn(),
    decrement: vi.fn(),
  };
  const dataSource = { transaction: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();
    Object.values(routeQueryBuilder).forEach((mock) => {
      if (mock !== routeQueryBuilder.getOne)
        mock.mockReturnValue(routeQueryBuilder);
    });
    tripRouteRepository.createQueryBuilder.mockReturnValue(routeQueryBuilder);
    dataSource.transaction.mockImplementation(
      (callback: (manager: typeof transactionManager) => Promise<unknown>) =>
        callback(transactionManager),
    );
    transactionManager.getRepository.mockImplementation((entity) => {
      if (entity === Destination) return transactionDestinationRepository;
      if (entity === TripRoute) return transactionTripRouteRepository;
      if (entity === TripRouteDay) return transactionDayRepository;
      if (entity === TripRouteItem) return transactionItemRepository;
      if (entity === Tag) return transactionTagRepository;
      if (entity === Spot) return transactionSpotRepository;
      return transactionBookmarkRepository;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripRoutesService,
        {
          provide: getRepositoryToken(TripRoute),
          useValue: tripRouteRepository,
        },
        {
          provide: getRepositoryToken(Destination),
          useValue: destinationRepository,
        },
        { provide: getRepositoryToken(Bookmark), useValue: bookmarkRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: DataSource, useValue: dataSource },
        { provide: SpotsService, useValue: spotsService },
      ],
    }).compile();
    service = module.get<TripRoutesService>(TripRoutesService);
  });

  it('returns six hot routes in bookmark and id order with destination cards', async () => {
    const route = createRoute();
    tripRouteRepository.find.mockResolvedValue([route]);

    await expect(service.findHotRoutes()).resolves.toEqual([
      {
        id: 1,
        slug: 'seoul-one-day',
        title: '서울 하루 여행',
        summary: '요약',
        days: 1,
        regionSlug: 'seoul',
        bookmarkCount: 2,
      },
    ]);
    expect(tripRouteRepository.find).toHaveBeenCalledWith({
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      relations: ['destination'],
      take: 6,
    });
  });

  it('rejects a route-region lookup when the destination does not exist', async () => {
    destinationRepository.findOne.mockResolvedValue(null);

    await expect(service.findByRegion('unknown')).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
    expect(tripRouteRepository.find).not.toHaveBeenCalled();
  });

  it('returns region routes using the bookmark ordering policy', async () => {
    const destination = { id: 10, slug: 'seoul' } as Destination;
    destinationRepository.findOne.mockResolvedValue(destination);
    tripRouteRepository.find.mockResolvedValue([createRoute({ destination })]);

    await expect(service.findByRegion('seoul')).resolves.toMatchObject([
      { slug: 'seoul-one-day', regionSlug: 'seoul' },
    ]);
    expect(tripRouteRepository.find).toHaveBeenCalledWith({
      where: { destination },
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      relations: ['destination'],
    });
  });

  it('maps route details for an anonymous user without querying bookmarks', async () => {
    destinationRepository.findOne.mockResolvedValue({ id: 10, slug: 'seoul' });
    routeQueryBuilder.getOne.mockResolvedValue(
      createRoute({
        honyeoTip: undefined,
        honyeoCost: undefined,
        tags: [{ id: 3, slug: 'food', label: '맛집' }] as Tag[],
        daysPlan: [
          {
            id: 4,
            dayNumber: 1,
            title: '첫째 날',
            note: '천천히',
            items: [
              {
                id: 5,
                order: 1,
                recommendedLevel: 4,
                title: '카페',
                description: '휴식',
                lat: 37.5,
                lng: 127.0,
                spot: { id: 6, slug: 'cafe' },
              },
            ],
          },
        ] as never,
      }),
    );

    await expect(
      service.findByRegionAndSlug('seoul', 'seoul-one-day'),
    ).resolves.toMatchObject({
      bookmarkedByMe: false,
      honyeoTip: null,
      honyeoCost: null,
      tags: [{ slug: 'food' }],
      daysPlan: [
        {
          items: [
            {
              lat: 37.5,
              lng: 127,
              spot: { id: 6, slug: 'cafe' },
            },
          ],
        },
      ],
    });
    expect(bookmarkRepository.exists).not.toHaveBeenCalled();
  });

  it('marks route details as bookmarked for an authenticated owner', async () => {
    destinationRepository.findOne.mockResolvedValue({ id: 10, slug: 'seoul' });
    routeQueryBuilder.getOne.mockResolvedValue(createRoute());
    bookmarkRepository.exists.mockResolvedValue(true);

    await expect(
      service.findByRegionAndSlug('seoul', 'seoul-one-day', 7),
    ).resolves.toMatchObject({ bookmarkedByMe: true });
    expect(bookmarkRepository.exists).toHaveBeenCalledWith({
      where: { tripRoute: { id: 1 }, user: { id: 7 } },
    });
  });

  it('rejects a missing route after its region has been resolved', async () => {
    destinationRepository.findOne.mockResolvedValue({ id: 10, slug: 'seoul' });
    routeQueryBuilder.getOne.mockResolvedValue(null);

    await expect(
      service.findByRegionAndSlug('seoul', 'missing'),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
  });

  it('returns no nearby suggestions when a route has no usable coordinates', async () => {
    tripRouteRepository.findOne.mockResolvedValue(createRoute());

    await expect(
      service.getNearbySpots('seoul-one-day', 2, undefined, undefined),
    ).resolves.toEqual([]);
    expect(spotsService.findNearbyByPoints).not.toHaveBeenCalled();
  });

  it('collects direct and spot-fallback coordinates, de-duplicates them, and excludes route spots', async () => {
    tripRouteRepository.findOne.mockResolvedValue(
      createRoute({
        daysPlan: [
          {
            items: [
              { lat: 37.5, lng: 127, spotId: 11 },
              { spot: { lat: 37.5, lng: 127 }, spotId: 11 },
              { spot: { lat: 37.6, lng: 127.1 }, spotId: 12 },
            ],
          },
        ] as never,
      }),
    );
    spotsService.findNearbyByPoints.mockResolvedValue({});

    await service.getNearbySpots('seoul-one-day', 3, [SpotCategory.NATURE]);

    expect(spotsService.findNearbyByPoints).toHaveBeenCalledWith({
      destinationId: 10,
      points: [
        { lat: 37.5, lng: 127 },
        { lat: 37.6, lng: 127.1 },
      ],
      radiusKm: 3,
      categories: [SpotCategory.NATURE],
      limit: 10,
      excludeSpotIds: [11, 12],
    });
  });

  it('caps nearby route points at 30 before delegating to SpotsService', async () => {
    tripRouteRepository.findOne.mockResolvedValue(
      createRoute({
        daysPlan: [
          {
            items: Array.from({ length: 31 }, (_, index) => ({
              lat: 37 + index / 100,
              lng: 127,
            })),
          },
        ] as never,
      }),
    );
    spotsService.findNearbyByPoints.mockResolvedValue({});

    await service.getNearbySpots('seoul-one-day', 3);

    const args = spotsService.findNearbyByPoints.mock
      .calls[0][0] as unknown as {
      points: unknown[];
    };
    expect(args.points).toHaveLength(30);
  });

  it('rejects nearby lookup for a missing route', async () => {
    tripRouteRepository.findOne.mockResolvedValue(null);

    await expect(service.getNearbySpots('missing', 3)).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
  });

  it('rejects creation when the destination or one of its tags is missing', async () => {
    transactionDestinationRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      service.createOne({
        slug: 'new-route',
        destinationSlug: 'unknown',
        title: '새 루트',
        summary: '요약',
        days: 1,
        daysPlan: [],
      }),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });

    transactionDestinationRepository.findOne.mockResolvedValueOnce({
      id: 10,
      slug: 'seoul',
    });
    transactionTagRepository.find.mockResolvedValueOnce([
      { id: 1, slug: 'food' } as Tag,
    ]);
    await expect(
      service.createOne({
        slug: 'new-route',
        destinationSlug: 'seoul',
        title: '새 루트',
        summary: '요약',
        days: 1,
        tagSlugs: ['food', 'cafe'],
        daysPlan: [],
      }),
    ).rejects.toThrow('Invalid tag slugs: cafe');
  });

  it('loads duplicate spot slugs once and gives linked spots precedence over custom item fields', async () => {
    const destination = { id: 10, slug: 'seoul' } as Destination;
    const linkedSpot = {
      id: 30,
      slug: 'linked',
      imageUrl: 'spot-image',
      imageCredit: 'spot-credit',
      lat: 37.5,
      lng: 127,
      address: 'spot address',
    } as Spot;
    transactionDestinationRepository.findOne.mockResolvedValue(destination);
    transactionTripRouteRepository.create.mockImplementation(
      (input: Partial<TripRoute>) => ({ id: 20, ...input }) as TripRoute,
    );
    transactionTripRouteRepository.save.mockImplementation((route: TripRoute) =>
      Promise.resolve(route),
    );
    transactionDayRepository.create.mockImplementation(
      (input: Partial<TripRouteDay>) => ({ id: 40, ...input }) as TripRouteDay,
    );
    transactionDayRepository.save.mockResolvedValue(undefined);
    transactionItemRepository.create.mockImplementation(
      (input: Partial<TripRouteItem>) => input as TripRouteItem,
    );
    transactionItemRepository.save.mockResolvedValue(undefined);
    transactionSpotRepository.find.mockResolvedValue([linkedSpot]);

    const route = await service.createOne({
      slug: 'new-route',
      destinationSlug: 'seoul',
      title: '새 루트',
      summary: '요약',
      days: 1,
      daysPlan: [
        {
          dayNumber: 1,
          title: '첫째 날',
          note: '메모',
          items: [
            {
              order: 1,
              title: '연결 스팟',
              description: '설명',
              spotSlug: 'linked',
              imageUrl: 'custom-image',
              lat: 1,
              lng: 2,
              address: 'custom address',
            },
            {
              order: 2,
              title: '중복 연결',
              description: '설명',
              spotSlug: 'linked',
            },
            {
              order: 3,
              title: '직접 입력',
              description: '설명',
              imageUrl: 'custom-only',
              lat: 35.1,
              lng: 129.1,
              address: 'custom address',
            },
          ],
        },
      ],
    });

    expect(transactionSpotRepository.find).toHaveBeenCalledTimes(1);
    expect(transactionItemRepository.create).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        spot: linkedSpot,
        imageUrl: 'spot-image',
        imageCredit: 'spot-credit',
        lat: 37.5,
        lng: 127,
        address: 'spot address',
      }),
    );
    expect(transactionItemRepository.create).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        spot: undefined,
        imageUrl: 'custom-only',
        lat: 35.1,
        lng: 129.1,
      }),
    );
    expect(route.bookmarkCount).toBe(0);
    expect(route.daysPlan[0].items).toHaveLength(3);
  });

  it('rejects creation when a referenced spot is missing after batched lookup', async () => {
    transactionDestinationRepository.findOne.mockResolvedValue({
      id: 10,
      slug: 'seoul',
    });
    transactionTripRouteRepository.create.mockImplementation(
      (input: Partial<TripRoute>) => input as TripRoute,
    );
    transactionTripRouteRepository.save.mockImplementation((route: TripRoute) =>
      Promise.resolve(route),
    );
    transactionDayRepository.create.mockImplementation(
      (input: Partial<TripRouteDay>) => input as TripRouteDay,
    );
    transactionDayRepository.save.mockResolvedValue(undefined);
    transactionSpotRepository.find.mockResolvedValue([]);

    await expect(
      service.createOne({
        slug: 'new-route',
        destinationSlug: 'seoul',
        title: '새 루트',
        summary: '요약',
        days: 1,
        daysPlan: [
          {
            dayNumber: 1,
            title: '첫째 날',
            note: '메모',
            items: [
              {
                order: 1,
                title: '없는 스팟',
                description: '설명',
                spotSlug: 'missing',
              },
            ],
          },
        ],
      }),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
  });

  it('does not add a duplicate bookmark or increment its counter', async () => {
    const user = { id: 7 } as User;
    const route = createRoute({ bookmarkCount: 5 });
    transactionManager.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(route);
    transactionBookmarkRepository.exists.mockResolvedValue(true);

    await expect(service.addBookmark(7, route.slug)).resolves.toEqual({
      bookmarked: true,
      bookmarkCount: 5,
    });
    expect(transactionManager.save).not.toHaveBeenCalled();
    expect(transactionManager.increment).not.toHaveBeenCalled();
  });

  it('adds a missing bookmark and returns the persisted counter', async () => {
    const user = { id: 7 } as User;
    const route = createRoute({ bookmarkCount: 5 });
    transactionManager.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(route)
      .mockResolvedValueOnce({ ...route, bookmarkCount: 6 });
    transactionBookmarkRepository.exists.mockResolvedValue(false);
    transactionManager.create.mockReturnValue({ id: 9 });

    await expect(service.addBookmark(7, route.slug)).resolves.toEqual({
      bookmarked: true,
      bookmarkCount: 6,
    });
    expect(transactionManager.increment).toHaveBeenCalledWith(
      TripRoute,
      { id: route.id },
      'bookmarkCount',
      1,
    );
  });

  it('keeps bookmark removal idempotent when no bookmark exists', async () => {
    const user = { id: 7 } as User;
    const route = createRoute({ bookmarkCount: 5 });
    transactionManager.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(route);
    transactionBookmarkRepository.findOne.mockResolvedValue(null);

    await expect(service.removeBookmark(7, route.slug)).resolves.toEqual({
      bookmarked: false,
      bookmarkCount: 5,
    });
    expect(transactionManager.remove).not.toHaveBeenCalled();
    expect(transactionManager.decrement).not.toHaveBeenCalled();
  });

  it('removes an existing bookmark and decrements its counter', async () => {
    const user = { id: 7 } as User;
    const route = createRoute({ bookmarkCount: 5 });
    const bookmark = { id: 9 } as Bookmark;
    transactionManager.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(route)
      .mockResolvedValueOnce({ ...route, bookmarkCount: 4 });
    transactionBookmarkRepository.findOne.mockResolvedValue(bookmark);

    await expect(service.removeBookmark(7, route.slug)).resolves.toEqual({
      bookmarked: false,
      bookmarkCount: 4,
    });
    expect(transactionManager.remove).toHaveBeenCalledWith(bookmark);
    expect(transactionManager.decrement).toHaveBeenCalledWith(
      TripRoute,
      { id: route.id },
      'bookmarkCount',
      1,
    );
  });

  it.each([
    ['removes', { id: 9 } as Bookmark, false, 4],
    ['adds', null, true, 6],
  ])(
    'toggleBookmark %s the bookmark and returns its counter',
    async (_action, bookmark, bookmarked, bookmarkCount) => {
      const user = { id: 7 } as User;
      const route = createRoute({ bookmarkCount: 5 });
      transactionManager.findOne
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce(route)
        .mockResolvedValueOnce({ ...route, bookmarkCount });
      transactionBookmarkRepository.findOne.mockResolvedValue(bookmark);
      transactionManager.create.mockReturnValue({ id: 10 });

      await expect(service.toggleBookmark(7, route.slug)).resolves.toEqual({
        bookmarked,
        bookmarkCount,
      });

      expect(
        bookmarked
          ? transactionManager.increment
          : transactionManager.decrement,
      ).toHaveBeenCalledWith(TripRoute, { id: route.id }, 'bookmarkCount', 1);
    },
  );

  it('rejects bookmark changes when either the user or route is missing', async () => {
    transactionManager.findOne.mockResolvedValueOnce(null);

    await expect(
      service.toggleBookmark(7, 'seoul-one-day'),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });
  });
});
