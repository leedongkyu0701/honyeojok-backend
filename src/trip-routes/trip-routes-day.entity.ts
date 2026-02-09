// src/trip-routes/trip-route-day.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { TripRoute } from './trip-route.entity';
import { TripRouteItem } from './trip-route-item.entity';

@Entity()
@Index(['tripRoute', 'dayNumber'], { unique: true })
export class TripRouteDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  dayNumber: number; // 1,2,3...

  @Column({ nullable: true })
  title?: string; // "서귀포 감성 코스" 같은 소제목

  @Column({ type: 'text', nullable: true })
  note?: string; // 그날 팁/주의사항

  @ManyToOne(() => TripRoute, (route) => route.daysPlan, {
    onDelete: 'CASCADE',
  })
  tripRoute: TripRoute;

  @OneToMany(() => TripRouteItem, (item) => item.day, { cascade: true })
  items: TripRouteItem[];
}
