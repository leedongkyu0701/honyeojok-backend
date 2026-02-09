import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PostImage } from './post-image.entity';
import { Comment } from './comment.entity';
import { Destination } from '../destinations/destination.entity';
import { PostType } from '../types/post';
import { PostLike } from './post_like.entity';

@Index(['isDeleted', 'type', 'createdAt'])
@Index(['userId', 'isDeleted', 'createdAt'])
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('float', { nullable: true })
  rating?: number;

  @Column({ nullable: true })
  region?: string;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column()
  userId: number;

  @OneToMany(() => PostLike, (like) => like.post, { cascade: true })
  likes: PostLike[];

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Destination, (destination) => destination.posts, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  destination?: Destination;

  @OneToMany(() => PostImage, (image) => image.post, { cascade: true })
  images: PostImage[];

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
