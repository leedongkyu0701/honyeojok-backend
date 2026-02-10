import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false, // 마이그레이션을 사용할 것이기 때문에 false로 설정
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
