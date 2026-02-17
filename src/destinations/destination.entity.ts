import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TripRoute } from '../trip-routes/trip-route.entity';
import { Spot } from '../spots/spot.entity';
import { Post } from '../posts/post.entity';
import { ProvinceGroup } from '../types/destination';
import { ImageSource } from 'src/types/util';
import { Tag } from 'src/tags/tag.entity';

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

  @Column('int', { unique: true })
  rank: number;

  @Column('float')
  score: number;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  summary: string;

  @Column({ type: 'text' })
  description: string;

  // 혼여 지표 세부 항목

  @Column('int')
  food: number;

  @Column('int')
  transport: number;

  @Column('int')
  safety: number;

  @Column('int')
  loneliness: number;

  //이미지 관련

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({
    type: 'enum',
    enum: ImageSource,
    nullable: true,
  })
  imageSource?: ImageSource;

  @Column({ nullable: true })
  imageCredit?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계

  @OneToMany(() => TripRoute, (tripRoute) => tripRoute.destination)
  tripRoutes: TripRoute[];

  @OneToMany(() => Post, (post) => post.destination)
  posts: Post[];

  @OneToMany(() => Spot, (spot) => spot.destination)
  spots: Spot[];

  @ManyToMany(() => Tag, (tag) => tag.destinations)
  @JoinTable({ name: 'destination_tags' })
  tags: Tag[];
}
