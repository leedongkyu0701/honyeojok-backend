import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { Spot } from './spot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from '../destinations/destination.entity';
import { Tag } from '../tags/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, Destination, Tag])],
  providers: [SpotService],
  controllers: [SpotController],
})
export class SpotModule {}
