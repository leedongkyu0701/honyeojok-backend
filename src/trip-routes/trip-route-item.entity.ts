// src/trip-routes/trip-route-item.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { TripRouteDay } from './trip-routes-day.entity';
import { TripRouteItemType } from '../types/trip-route';

@Entity()
@Index(['day', 'order'], { unique: true })
export class TripRouteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TripRouteItemType })
  type: TripRouteItemType;

  @Column('int')
  order: number; // 1,2,3... (그날 순서)

  @Column('int')
  recommendedLevel: number; // 추천도 1~5

  // "이름/설명"은 커스텀 입력 가능하게
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // 장소 이미지(커스텀일 때)
  @Column({ nullable: true })
  imageUrl?: string;

  // 지도용(커스텀일 때)
  @Column('float', { nullable: true })
  lat?: number;

  @Column('float', { nullable: true })
  lng?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  startTime?: string; // "10:30"

  @Column({ nullable: true })
  endTime?: string;

  @ManyToOne(() => TripRouteDay, (day) => day.items, { onDelete: 'CASCADE' })
  day: TripRouteDay;

  @Column({ nullable: true })
  externalUrl?: string;
}
