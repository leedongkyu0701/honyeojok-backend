import { Module } from '@nestjs/common';
import { TripRoutesService } from './trip-routes.service';
import { TripRoutesController } from './trip-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRoute } from './trip-route.entity';
import { Destination } from '../destinations/destination.entity';
import { Bookmark } from '../trip-routes/bookmark.entity';
import { User } from '../user/user.entity';
import { TripRouteDay } from './trip-routes-day.entity';
import { TripRouteItem } from './trip-route-item.entity';
import { SpotModule } from 'src/spots/spot.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TripRoute,
      Destination,
      Bookmark,
      User,
      TripRouteDay,
      TripRouteItem,
    ]),
    SpotModule,
    AuthModule,
  ],

  providers: [TripRoutesService],
  controllers: [TripRoutesController],
})
export class TripRoutesModule {}
