import request from 'supertest';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { inject } from 'vitest';
import {
  createTestDestination,
  createTestTripRoute,
} from '../support/database/fixtures';
import { resetDatabase } from '../support/database/reset-database';
import {
  createE2eApplication,
  type E2eApplication,
} from '../support/e2e/create-e2e-app';
import { createAuthenticatedUser } from '../support/e2e/authenticated-user';

describe('Trip route bookmark journey (e2e)', () => {
  let e2e: E2eApplication;

  beforeAll(async () => {
    e2e = await createE2eApplication(inject('e2eDatabase'));
  });

  beforeEach(async () => {
    await resetDatabase(e2e.dataSource);
  });

  afterAll(async () => {
    await e2e.app.close();
  });

  it('shows anonymous bookmark state, adds a bookmark, then reflects it for the authenticated user', async () => {
    const destination = await createTestDestination(e2e.dataSource);
    const route = await createTestTripRoute(e2e.dataSource, destination);
    const { user, accessToken } = await createAuthenticatedUser(
      e2e.dataSource,
      e2e.authService,
    );

    const anonymousDetail = await request(e2e.app.getHttpServer())
      .get(`/trip-routes/region/${destination.slug}/${route.slug}`)
      .expect(200);
    expect(anonymousDetail.body).toMatchObject({
      id: route.id,
      slug: route.slug,
      bookmarkedByMe: false,
      bookmarkCount: 0,
    });

    const bookmarkResponse = await request(e2e.app.getHttpServer())
      .put(`/trip-routes/bookmark/add/${route.slug}`)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(bookmarkResponse.body).toEqual({
      bookmarked: true,
      bookmarkCount: 1,
    });
    await expect(
      e2e.dataSource.getRepository(Bookmark).findOneByOrFail({
        userId: user.id,
        tripRouteId: route.id,
      }),
    ).resolves.toBeDefined();
    await expect(
      e2e.dataSource.getRepository(TripRoute).findOneByOrFail({ id: route.id }),
    ).resolves.toMatchObject({ bookmarkCount: 1 });

    const authenticatedDetail = await request(e2e.app.getHttpServer())
      .get(`/trip-routes/region/${destination.slug}/${route.slug}`)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(authenticatedDetail.body).toMatchObject({
      id: route.id,
      bookmarkedByMe: true,
      bookmarkCount: 1,
    });
  });
});
