import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';

@Entity('bookmarks')
@Index(
  'IDX_bookmarks_user_id_trip_route_id_unique',
  ['userId', 'tripRouteId'],
  { unique: true },
) // 중복 북마크 방지
@Index('IDX_bookmarks_user_id_created_at', ['userId', 'createdAt'])
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  tripRouteId: number;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => TripRoute, (tripRoute) => tripRoute.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tripRouteId' })
  tripRoute: TripRoute;

  @CreateDateColumn()
  createdAt: Date;
}
