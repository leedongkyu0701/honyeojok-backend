import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from 'src/spots/spot.entity';
import { Destination } from 'src/destinations/destination.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column()
  label: string;

  @ManyToMany(() => TripRoute, (route) => route.tags)
  tripRoutes: TripRoute[];

  @ManyToMany(() => Spot, (spot) => spot.tags)
  spots: Spot[];

  @ManyToMany(() => Destination, (destination) => destination.tags)
  destinations: Destination[];
}
