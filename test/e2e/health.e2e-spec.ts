import request from 'supertest';
import { inject } from 'vitest';
import {
  createE2eApplication,
  type E2eApplication,
} from '../support/e2e/create-e2e-app';

describe('Health endpoints (e2e)', () => {
  let e2e: E2eApplication;

  beforeAll(async () => {
    e2e = await createE2eApplication(inject('e2eDatabase'));
  });

  afterAll(async () => {
    await e2e.app.close();
  });

  it('returns the Terminus liveness response through the production pipeline', async () => {
    const response = await request(e2e.app.getHttpServer())
      .get('/health/live')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      info: {},
      error: {},
    });
  });

  it('checks the Testcontainers PostgreSQL connection for readiness', async () => {
    const response = await request(e2e.app.getHttpServer())
      .get('/health/ready')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      info: {
        postgresql: {
          status: 'up',
        },
      },
    });
  });
});
