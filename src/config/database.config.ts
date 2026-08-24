import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { DataSourceOptions } from 'typeorm';
import { getEnvironment } from './environment';

export type DatabaseConfiguration = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
};

export function createDatabaseConfiguration(): DatabaseConfiguration {
  const env = getEnvironment();

  return {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ssl: env.DB_SSL,
  };
}

export const databaseConfig = registerAs(
  'database',
  createDatabaseConfiguration,
);

export function createDatabaseConnectionOptions(
  config: DatabaseConfiguration,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
    synchronize: false,
    dropSchema: false,
    extra: {
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  };
}

export function createNestDatabaseOptions(
  config: DatabaseConfiguration,
): TypeOrmModuleOptions {
  return {
    ...createDatabaseConnectionOptions(config),
    autoLoadEntities: true,
  };
}
