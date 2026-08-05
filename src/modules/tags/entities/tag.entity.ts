import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { Destination } from 'src/modules/destinations/entities/destination.entity';

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
