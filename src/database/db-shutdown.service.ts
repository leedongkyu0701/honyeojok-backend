import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DbShutdownService implements OnApplicationShutdown {
  constructor(@InjectDataSource() private readonly ds: DataSource) {}

  async onApplicationShutdown() {
    // 이미 초기화된 경우에만 안전하게 종료
    if (this.ds.isInitialized) {
      await this.ds.destroy();
    }
  }
}
