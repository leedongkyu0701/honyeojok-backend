import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Destination } from '../destinations/destination.entity';
import { Tag } from '../tags/tag.entity';
import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';

@Index(['destinationId', 'isRecommended', 'id'])
@Index(['destinationId', 'id'])
@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  summary: string;

  @Column({ type: 'enum', enum: SpotCategory, default: SpotCategory.ETC })
  category?: SpotCategory;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  honyeoTip?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl?: string;

  @Column({ type: 'enum', enum: ImageSource, nullable: true })
  imageSource?: ImageSource;

  @Column({ type: 'varchar', nullable: true })
  imageCredit?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column('double precision', { nullable: true })
  lat?: number;

  @Column('double precision', { nullable: true })
  lng?: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  externalUrl?: string;

  @Column({ default: false })
  isRecommended: boolean;

  @Column()
  destinationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계
  @ManyToOne(() => Destination, (destination) => destination.spots, {
    onDelete: 'CASCADE', // 여행지가 삭제되면 해당 스팟도 삭제
  })
  @JoinColumn({ name: 'destinationId' })
  destination: Destination;

  @ManyToMany(() => Tag, (tag) => tag.spots)
  @JoinTable({ name: 'spot_tags' })
  tags: Tag[];
}
