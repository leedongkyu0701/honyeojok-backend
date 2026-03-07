import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Index('IDX_post_images_post_id_img_order', ['postId', 'imgOrder'])
@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  caption?: string;

  @Column({ type: 'int', default: 0 })
  imgOrder: number;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
