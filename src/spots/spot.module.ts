import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { Spot } from './spot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from '../destinations/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, Destination])],
  providers: [SpotService],
  controllers: [SpotController],
  exports: [SpotService],
})
export class SpotModule {}
