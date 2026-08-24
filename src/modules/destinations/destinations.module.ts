import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination, TripRoute, Spot])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
