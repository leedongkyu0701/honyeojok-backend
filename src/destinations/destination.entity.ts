// src/destinations/destination.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from '../spots/spot.entity';
import { Post } from '../posts/post.entity';
import { ProvinceGroup } from '../types/destination';
import { ImageSource } from 'src/types/destination';

@Index(['province', 'rank'])
@Entity('destinations')
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({
    type: 'enum',
    enum: ProvinceGroup,
  })
  province: ProvinceGroup;

  @Column()
  name: string;

  @Column('float')
  score: number;

  @Column()
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ImageSource,
    nullable: true,
  })
  imageSource?: ImageSource;

  @Column({ nullable: true })
  imageCredit?: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  summary: string;

  @Column('int', { default: 0 })
  reviewCount: number;

  @Column('int', { unique: true })
  rank: number;

  // 난이도 (embedded)
  @Column('int')
  food: number;

  @Column('int')
  transport: number;

  @Column('int')
  safety: number;

  @Column('int')
  loneliness: number;

  @OneToMany(() => TripRoute, (tripRoute) => tripRoute.destination)
  tripRoutes: TripRoute[];

  @OneToMany(() => Post, (post) => post.destination)
  posts: Post[];

  @OneToMany(() => Spot, (spot) => spot.destination)
  spots: Spot[];
}
