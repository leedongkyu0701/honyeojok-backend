import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from 'src/spots/spot.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tag, TripRoute, Spot])],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
