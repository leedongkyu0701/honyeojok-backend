import { DataSource } from 'typeorm';

type TableRow = { tablename: string };

export async function resetDatabase(dataSource: DataSource): Promise<void> {
  const tables = await dataSource.query<TableRow[]>(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public' AND tablename <> 'migrations'
  `);

  if (tables.length === 0) {
    return;
  }

  const tableNames = tables.map(({ tablename }) => quoteIdentifier(tablename));
  await dataSource.query(
    `TRUNCATE TABLE ${tableNames.join(', ')} RESTART IDENTITY CASCADE`,
  );
}

function quoteIdentifier(identifier: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
    throw new Error(`Unexpected table name: ${identifier}`);
  }

  return `"${identifier}"`;
}
