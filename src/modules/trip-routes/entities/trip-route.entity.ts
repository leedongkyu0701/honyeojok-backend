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
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { Bookmark } from './bookmark.entity';
import { TripRouteDay } from './trip-route-day.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('trip_routes')
@Index('IDX_trip_routes_destination_id_bookmark_count_id', [
  'destinationId',
  'bookmarkCount',
  'id',
])
export class TripRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ length: 300 })
  summary: string;

  @Column({ type: 'text', nullable: true })
  honyeoTip?: string;

  @Column('int')
  days: number;

  @Column('int', { nullable: true })
  honyeoCost?: number;

  @Column('int', { default: 0 })
  bookmarkCount: number;

  @Column()
  destinationId: number;

  // 관계
  @ManyToOne(() => Destination, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destinationId' })
  destination: Destination;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.tripRoute)
  bookmarks: Bookmark[];

  @OneToMany(() => TripRouteDay, (day) => day.tripRoute)
  daysPlan: TripRouteDay[];

  @JoinTable({ name: 'trip_route_tags' })
  @ManyToMany(() => Tag, (tag) => tag.tripRoutes)
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
