import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { MediaUpload } from 'src/modules/uploads/entities/media-upload.entity';

@Index('IDX_post_images_post_id_img_order', ['postId', 'imgOrder'])
@Index('IDX_post_images_upload_id_unique', ['uploadId'], { unique: true })
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

  @Column({ type: 'uuid', nullable: true })
  uploadId?: string | null;

  @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => MediaUpload, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'uploadId',
    foreignKeyConstraintName: 'FK_post_images_upload_id',
  })
  upload?: MediaUpload | null;
}
