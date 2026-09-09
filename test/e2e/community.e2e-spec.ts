import request from 'supertest';
import { Comment } from 'src/modules/posts/entities/comment.entity';
import { PostLike } from 'src/modules/posts/entities/post-like.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import {
  createE2eApplication,
  type E2eApplication,
} from '../support/e2e/create-e2e-app';
import { createAuthenticatedUser } from '../support/e2e/authenticated-user';
import { resetDatabase } from '../support/database/reset-database';

describe('Community journey (e2e)', () => {
  let e2e: E2eApplication;

  beforeAll(async () => {
    e2e = await createE2eApplication();
  });

  beforeEach(async () => {
    await resetDatabase(e2e.dataSource);
  });

  afterAll(async () => {
    await e2e.app.close();
  });

  it('creates, reads, likes and comments on a post through the real HTTP and database stack', async () => {
    const { user, accessToken } = await createAuthenticatedUser(
      e2e.dataSource,
      e2e.authService,
    );
    const createResponse = await request(e2e.app.getHttpServer())
      .post('/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: '혼자 떠난 서울 여행',
        content: '조용한 하루를 보냈습니다.',
        type: 'FREE',
      })
      .expect(201);
    const createBody = getResponseBody(createResponse.body);
    const postId = getNumberProperty(createBody, 'id');

    expect(createBody).toMatchObject({
      title: '혼자 떠난 서울 여행',
      type: 'FREE',
      likeCount: 0,
    });
    await expect(
      e2e.dataSource.getRepository(Post).findOneByOrFail({ id: postId }),
    ).resolves.toMatchObject({
      userId: user.id,
      title: '혼자 떠난 서울 여행',
    });

    const detailResponse = await request(e2e.app.getHttpServer())
      .get(`/posts/${postId}`)
      .expect(200);
    expect(getResponseBody(detailResponse.body)).toMatchObject({
      id: postId,
      content: '조용한 하루를 보냈습니다.',
      likedByMe: false,
      images: [],
    });

    const likeResponse = await request(e2e.app.getHttpServer())
      .post(`/posts/${postId}/like`)
      .auth(accessToken, { type: 'bearer' })
      .expect(201);
    expect(getResponseBody(likeResponse.body)).toEqual({
      liked: true,
      likeCount: 1,
    });
    await expect(e2e.dataSource.getRepository(PostLike).count()).resolves.toBe(
      1,
    );

    const commentResponse = await request(e2e.app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .auth(accessToken, { type: 'bearer' })
      .send({ content: '좋은 여행이네요.' })
      .expect(201);
    const commentBody = getResponseBody(commentResponse.body);
    expect(getNumberProperty(commentBody, 'id')).toBeGreaterThan(0);
    expect(commentBody).toMatchObject({
      content: '좋은 여행이네요.',
      postId,
      userId: user.id,
    });
    await expect(e2e.dataSource.getRepository(Comment).count()).resolves.toBe(
      1,
    );
  });

  it('requires an access token to create a post', async () => {
    const response = await request(e2e.app.getHttpServer())
      .post('/posts')
      .send({
        title: '인증되지 않은 게시글',
        content: '작성할 수 없어야 합니다.',
        type: 'FREE',
      })
      .expect(401);

    expect(getResponseBody(response.body)).toMatchObject({
      ok: false,
      code: 'AUTH_UNAUTHORIZED',
    });
  });

  it('rejects unknown post properties through ValidationPipe and the global error filter', async () => {
    const { accessToken } = await createAuthenticatedUser(
      e2e.dataSource,
      e2e.authService,
    );

    const response = await request(e2e.app.getHttpServer())
      .post('/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: '유효성 검증 테스트',
        content: '알 수 없는 필드는 거부됩니다.',
        type: 'FREE',
        unexpected: true,
      })
      .expect(400);

    expect(getResponseBody(response.body)).toMatchObject({
      ok: false,
      code: 'VALIDATION_FAILED',
    });
  });
});

function getResponseBody(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Expected an object response body');
  }

  return value as Record<string, unknown>;
}

function getNumberProperty(
  value: Record<string, unknown>,
  key: string,
): number {
  const property = value[key];

  if (typeof property !== 'number') {
    throw new Error(`Expected ${key} to be a number`);
  }

  return property;
}
