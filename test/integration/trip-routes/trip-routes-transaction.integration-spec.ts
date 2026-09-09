import { DataSource } from 'typeorm';
import { inject } from 'vitest';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { SpotsService } from 'src/modules/spots/spots.service';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { TripRouteDay } from 'src/modules/trip-routes/entities/trip-route-day.entity';
import { TripRouteItem } from 'src/modules/trip-routes/entities/trip-route-item.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { TripRoutesService } from 'src/modules/trip-routes/trip-routes.service';
import { User } from 'src/modules/users/entities/user.entity';
import { createIntegrationDataSource } from '../helpers/integration-data-source';
import { createTestDestination } from '../helpers/fixtures';
import { resetDatabase } from '../helpers/reset-database';

describe('TripRoutesService transaction', () => {
  let dataSource: DataSource;
  let service: TripRoutesService;

  beforeAll(async () => {
    dataSource = createIntegrationDataSource(inject('integrationDatabase'));
    await dataSource.initialize();
    service = new TripRoutesService(
      dataSource.getRepository(TripRoute),
      dataSource.getRepository(Destination),
      dataSource.getRepository(Bookmark),
      dataSource.getRepository(User),
      dataSource,
      undefined as unknown as SpotsService,
    );
  });

  beforeEach(async () => {
    await resetDatabase(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('rolls back a route and its day when a later spot reference is missing', async () => {
    const destination = await createTestDestination(dataSource);

    await expect(
      service.createOne({
        slug: 'rollback-route',
        destinationSlug: destination.slug,
        title: '롤백 확인 루트',
        summary: '실제 transaction rollback 확인',
        days: 1,
        daysPlan: [
          {
            dayNumber: 1,
            title: '첫째 날',
            note: '실패해야 하는 일정',
            items: [
              {
                order: 1,
                recommendedLevel: 3,
                spotSlug: 'does-not-exist',
                title: '없는 스팟',
                description: '이 참조는 transaction을 실패시킨다.',
                lat: 37.5665,
                lng: 126.978,
              },
            ],
          },
        ],
      }),
    ).rejects.toMatchObject({ code: ErrorCode.RESOURCE_NOT_FOUND });

    await expect(dataSource.getRepository(TripRoute).count()).resolves.toBe(0);
    await expect(dataSource.getRepository(TripRouteDay).count()).resolves.toBe(
      0,
    );
    await expect(dataSource.getRepository(TripRouteItem).count()).resolves.toBe(
      0,
    );
  });
});
