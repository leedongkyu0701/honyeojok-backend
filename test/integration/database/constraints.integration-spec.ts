import { QueryFailedError, DataSource } from 'typeorm';
import { inject } from 'vitest';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { PostLike } from 'src/modules/posts/entities/post-like.entity';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { createIntegrationDataSource } from '../../support/database/test-data-source';
import {
  createTestDestination,
  createTestMediaUpload,
  createTestPost,
  createTestTripRoute,
  createTestUser,
} from '../../support/database/fixtures';
import { resetDatabase } from '../../support/database/reset-database';

describe('PostgreSQL constraints', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = createIntegrationDataSource(inject('integrationDatabase'));
    await dataSource.initialize();
  });

  beforeEach(async () => {
    await resetDatabase(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('enforces the post_likes user/post unique index', async () => {
    const user = await createTestUser(dataSource);
    const post = await createTestPost(dataSource, user);
    const repository = dataSource.getRepository(PostLike);

    await repository.save(
      repository.create({ postId: post.id, userId: user.id }),
    );

    await expectPostgresErrorCode(
      repository.save(repository.create({ postId: post.id, userId: user.id })),
      '23505',
    );
  });

  it('enforces the bookmarks user/trip route unique index', async () => {
    const user = await createTestUser(dataSource);
    const destination = await createTestDestination(dataSource);
    const route = await createTestTripRoute(dataSource, destination);
    const repository = dataSource.getRepository(Bookmark);

    await repository.save(
      repository.create({ userId: user.id, tripRouteId: route.id }),
    );

    await expectPostgresErrorCode(
      repository.save(
        repository.create({ userId: user.id, tripRouteId: route.id }),
      ),
      '23505',
    );
  });

  it('enforces unique OAuth provider identities', async () => {
    await createTestUser(dataSource, {
      provider: AuthProvider.KAKAO,
      providerId: 'kakao-account-1',
    });

    await expectPostgresErrorCode(
      createTestUser(dataSource, {
        provider: AuthProvider.KAKAO,
        providerId: 'kakao-account-1',
      }),
      '23505',
    );
  });

  it('enforces unique original upload keys', async () => {
    const user = await createTestUser(dataSource);
    const originalKey = 'images/posts/original/unique-upload';
    await createTestMediaUpload(dataSource, user, { originalKey });

    await expectPostgresErrorCode(
      createTestMediaUpload(dataSource, user, { originalKey }),
      '23505',
    );
  });

  it('rejects a post like whose post foreign key does not exist', async () => {
    const user = await createTestUser(dataSource);

    await expectPostgresErrorCode(
      dataSource.getRepository(PostLike).insert({
        postId: 999_999,
        userId: user.id,
      }),
      '23503',
    );
  });
});

async function expectPostgresErrorCode(
  operation: Promise<unknown>,
  expectedCode: string,
): Promise<void> {
  try {
    await operation;
  } catch (error) {
    expect(error).toBeInstanceOf(QueryFailedError);
    const driverError = (error as QueryFailedError).driverError as unknown as {
      code?: string;
    };
    expect(driverError.code).toBe(expectedCode);
    return;
  }

  throw new Error(`Expected PostgreSQL error code ${expectedCode}`);
}
