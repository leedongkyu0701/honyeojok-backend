import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { TripRoute } from './trip-route.entity';
import { TripRouteItem } from './trip-route-item.entity';

@Entity('trip_route_days')
@Index(['tripRouteId', 'dayNumber'], { unique: true })
export class TripRouteDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  dayNumber: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  note: string; // 그날 팁

  @Column()
  tripRouteId: number;

  @ManyToOne(() => TripRoute, (route) => route.daysPlan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tripRouteId' })
  tripRoute: TripRoute;

  @OneToMany(() => TripRouteItem, (item) => item.day)
  items: TripRouteItem[];
}
