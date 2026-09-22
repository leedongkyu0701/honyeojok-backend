import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { Spot } from './entities/spot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { RedisModule } from 'src/infrastructure/cache/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, Destination]), RedisModule],
  providers: [SpotsService],
  controllers: [SpotsController],
  exports: [SpotsService],
})
export class SpotsModule {}
