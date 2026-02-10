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
  url: process.env.DB_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false, // 마이그레이션을 사용할 것이기 때문에 false로 설정
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
