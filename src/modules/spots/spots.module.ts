import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { Spot } from './entities/spot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from 'src/modules/destinations/entities/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, Destination])],
  providers: [SpotsService],
  controllers: [SpotsController],
  exports: [SpotsService],
})
export class SpotsModule {}
