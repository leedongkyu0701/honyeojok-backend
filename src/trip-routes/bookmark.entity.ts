import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { TripRoute } from '../trip-routes/trip-route.entity';

@Entity('bookmarks')
@Index(['userId', 'tripRouteId'], { unique: true }) // 중복 북마크 방지
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
