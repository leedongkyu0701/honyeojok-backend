import { Module } from '@nestjs/common';
import { TripRoutesService } from './trip-routes.service';
import { TripRoutesController } from './trip-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRoute } from './entities/trip-route.entity';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TripRouteDay } from './entities/trip-route-day.entity';
import { TripRouteItem } from './entities/trip-route-item.entity';
import { SpotsModule } from 'src/modules/spots/spots.module';
import { AuthModule } from 'src/modules/auth/auth.module';

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
    SpotsModule,
    AuthModule,
  ],

  providers: [TripRoutesService],
  controllers: [TripRoutesController],
})
export class TripRoutesModule {}
