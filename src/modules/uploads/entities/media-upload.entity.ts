import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { MediaUploadStatus } from '../enums/media-upload-status.enum';

@Index('IDX_media_uploads_status_created_at', ['status', 'createdAt'])
@Index('IDX_media_uploads_user_id_status', ['userId', 'status'])
@Index('IDX_media_uploads_original_key_unique', ['originalKey'], {
  unique: true,
})
@Index('IDX_media_uploads_processed_key_unique', ['processedKey'], {
  unique: true,
})
@Entity('media_uploads')
export class MediaUpload {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'FK_media_uploads_user_id',
  })
  user: User;

  @Column()
  originalKey: string;

  @Column({ type: 'varchar', nullable: true })
  processedKey?: string | null;

  @Column()
  declaredContentType: string;

  @Column({ type: 'int' })
  declaredSize: number;

  @Column({
    type: 'enum',
    enum: MediaUploadStatus,
    default: MediaUploadStatus.PENDING,
  })
  status: MediaUploadStatus;

  @Column()
  expiresAt: Date;

  @Column({ type: 'int', nullable: true })
  width?: number | null;

  @Column({ type: 'int', nullable: true })
  height?: number | null;

  @Column({ type: 'int', nullable: true })
  processedSize?: number | null;

  @Column({ type: 'varchar', nullable: true })
  sourceEtag?: string | null;

  @Column({ type: 'varchar', nullable: true })
  failureCode?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  attachedAt?: Date | null;
}
