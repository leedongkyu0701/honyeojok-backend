import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { TripRouteDay } from './trip-routes-day.entity';
import { Spot } from 'src/spots/spot.entity';

@Index('IDX_trip_route_items_day_id_order_unique', ['dayId', 'order'], {
  unique: true,
})
@Entity('trip_route_items')
export class TripRouteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  order: number; // 하루 일정 내에서의 순서

  @Column('int', { default: 3 })
  recommendedLevel: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  // 장소 이미지(스팟 연결이 아닐경우 커스텀 이미지)
  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  imageCredit?: string;

  @Column('double precision', { nullable: true })
  lat?: number;

  @Column('double precision', { nullable: true })
  lng?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  startTime?: string;

  @Column({ nullable: true })
  endTime?: string;

  @Column({ nullable: true })
  externalUrl?: string;

  @Column()
  dayId: number;

  @Column({ nullable: true })
  spotId?: number;

  @ManyToOne(() => TripRouteDay, (day) => day.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dayId' })
  day: TripRouteDay;

  @ManyToOne(() => Spot, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'spotId' })
  spot?: Spot; // spot 에 있는 아이템일시 가져오기 (spotSlug dto에 추가)
}
