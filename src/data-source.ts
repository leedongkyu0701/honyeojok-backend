import { DataSource } from 'typeorm';
import { join } from 'node:path';
import {
  createDatabaseConfiguration,
  createDatabaseConnectionOptions,
} from './config/database.config';

export const AppDataSource = new DataSource({
  ...createDatabaseConnectionOptions(createDatabaseConfiguration()),
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'database', 'migrations', '*{.ts,.js}')],
});
