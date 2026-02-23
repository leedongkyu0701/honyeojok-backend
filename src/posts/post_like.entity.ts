import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Entity('post_likes')
@Index(['postId', 'userId'], { unique: true }) // 중복 좋아요 방지
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Index()
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
