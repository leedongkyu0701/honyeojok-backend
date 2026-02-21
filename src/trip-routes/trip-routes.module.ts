import { Module } from '@nestjs/common';
import { TripRoutesService } from './trip-routes.service';
import { TripRoutesController } from './trip-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRoute } from './trip-route.entity';
import { Destination } from '../destinations/destination.entity';
import { Bookmark } from '../trip-routes/bookmark.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tags/tag.entity';
import { TripRouteDay } from './trip-routes-day.entity';
import { TripRouteItem } from './trip-route-item.entity';
import { SpotModule } from 'src/spots/spot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TripRoute,
      Destination,
      Bookmark,
      User,
      Tag,
      TripRouteDay,
      TripRouteItem,
    ]),
    SpotModule,
  ],

  providers: [TripRoutesService],
  controllers: [TripRoutesController],
})
export class TripRoutesModule {}
