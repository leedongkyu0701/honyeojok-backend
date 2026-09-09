import { DataSource } from 'typeorm';
import { inject } from 'vitest';
import { createTestDataSource } from '../../support/database/test-data-source';

describe('PostgreSQL migrations', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = createTestDataSource(inject('integrationDatabase'));
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('records every migration and creates representative application tables', async () => {
    const migrations = await dataSource.query<MigrationRow[]>(
      'SELECT name FROM migrations ORDER BY id',
    );
    const tables = await dataSource.query<TableRow[]>(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `);

    expect(migrations.map(({ name }) => name)).toEqual([
      'Init1772685749868',
      'AddMediaUploads1772685750000',
    ]);
    expect(tables.map(({ tablename }) => tablename)).toEqual(
      expect.arrayContaining([
        'users',
        'posts',
        'post_likes',
        'bookmarks',
        'trip_routes',
        'media_uploads',
      ]),
    );
  });
});

type MigrationRow = { name: string };
type TableRow = { tablename: string };
