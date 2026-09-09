import { DataSource } from 'typeorm';
import { inject } from 'vitest';
import { PostLike } from 'src/modules/posts/entities/post-like.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { PostLikesService } from 'src/modules/posts/likes/post-likes.service';
import { createTestDataSource } from '../../support/database/test-data-source';
import {
  createTestPost,
  createTestUser,
} from '../../support/database/fixtures';
import { resetDatabase } from '../../support/database/reset-database';

describe('PostLikesService with PostgreSQL', () => {
  let dataSource: DataSource;
  let service: PostLikesService;

  beforeAll(async () => {
    dataSource = createTestDataSource(inject('integrationDatabase'));
    await dataSource.initialize();
    service = new PostLikesService(dataSource);
  });

  beforeEach(async () => {
    await resetDatabase(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('persists a like, increments its counter, then removes both on the next toggle', async () => {
    const user = await createTestUser(dataSource);
    const post = await createTestPost(dataSource, user);

    await expect(service.toggleLikePost(user.id, post.id)).resolves.toEqual({
      liked: true,
      likeCount: 1,
    });
    await expect(dataSource.getRepository(PostLike).count()).resolves.toBe(1);
    await expect(
      dataSource.getRepository(Post).findOneByOrFail({ id: post.id }),
    ).resolves.toMatchObject({ likeCount: 1 });

    await expect(service.toggleLikePost(user.id, post.id)).resolves.toEqual({
      liked: false,
      likeCount: 0,
    });
    await expect(dataSource.getRepository(PostLike).count()).resolves.toBe(0);
    await expect(
      dataSource.getRepository(Post).findOneByOrFail({ id: post.id }),
    ).resolves.toMatchObject({ likeCount: 0 });
  });

  it('keeps like rows and the counter consistent after concurrent toggles', async () => {
    const user = await createTestUser(dataSource);
    const post = await createTestPost(dataSource, user);

    await Promise.all(
      Array.from({ length: 4 }, () => service.toggleLikePost(user.id, post.id)),
    );

    await expect(dataSource.getRepository(PostLike).count()).resolves.toBe(0);
    await expect(
      dataSource.getRepository(Post).findOneByOrFail({ id: post.id }),
    ).resolves.toMatchObject({ likeCount: 0 });
  });
});
