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
import { User } from 'src/modules/users/entities/user.entity';

@Entity('post_likes')
@Index('IDX_post_likes_post_id_user_id_unique', ['postId', 'userId'], {
  unique: true,
}) // 중복 좋아요 방지
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
