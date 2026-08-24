import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { UserRole } from 'src/modules/users/enums/user-role.enum';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { Comment } from 'src/modules/posts/entities/comment.entity';

@Index('IDX_users_provider_provider_id_unique', ['provider', 'providerId'], {
  unique: true,
})
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  email?: string | null;

  @Column({ type: 'enum', enum: AuthProvider })
  provider: AuthProvider;

  @Column({ type: 'varchar' })
  providerId: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  nickName: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
