import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './destination.entity';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from '../spots/spot.entity';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination, TripRoute, Spot, Post])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
