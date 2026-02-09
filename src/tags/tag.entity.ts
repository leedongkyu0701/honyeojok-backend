// src/trip-routes/trip-route-tag.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from 'src/spots/spot.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  slug: string; // "sea", "emotional" 같은 고정값 추천

  @Column()
  label: string; // "바다", "감성"

  @ManyToMany(() => TripRoute, (route) => route.tags)
  tripRoutes: TripRoute[];

  @ManyToMany(() => Spot, (spot) => spot.tags)
  spots: Spot[];
}
