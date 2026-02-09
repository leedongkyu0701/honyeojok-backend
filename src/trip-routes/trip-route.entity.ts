// src/trip-routes/trip-route.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Destination } from '../destinations/destination.entity';
import { Bookmark } from './bookmark.entity';
import { TripRouteDay } from './trip-routes-day.entity';
import { Tag } from '../tags/tag.entity';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Index(['destinationId', 'bookmarkCount'])
@Entity()
export class TripRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Index()
  @Column()
  region: string;

  @Column()
  title: string;

  @Column({ length: 300 })
  summary: string;

  @Column('int')
  days: number;

  @Column('int', { default: 0 })
  bookmarkCount: number;

  @Column()
  destinationId: number;

  // 관계
  @ManyToOne(() => Destination, { onDelete: 'CASCADE' })
  // ondelete: 'CASCADE' 옵션을 추가하여, Destination이 삭제될 때 관련된 TripRoute도 함께 삭제되도록 설정
  @JoinColumn({ name: 'destinationId' })
  destination: Destination;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.tripRoute)
  bookmarks: Bookmark[];

  @OneToMany(() => TripRouteDay, (day) => day.tripRoute, { cascade: true })
  daysPlan: TripRouteDay[];

  @JoinTable({ name: 'trip_route_tags' })
  @ManyToMany(() => Tag, (tag) => tag.tripRoutes)
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
