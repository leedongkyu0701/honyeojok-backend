// src/spots/spot.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
} from 'typeorm';
import { Destination } from '../destinations/destination.entity';
import { Tag } from '../tags/tag.entity';
import { ImageSource } from 'src/types/destination';

@Index(['destinationId', 'id'])
@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  imageUrl: string | null;

  @Column({ type: 'enum', enum: ImageSource, nullable: true })
  imageSource: ImageSource | null;

  @Column({ type: 'varchar', nullable: true })
  imageCredit: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'varchar', nullable: true })
  externalUrl: string | null;

  @Column({ default: false })
  isRecommended: boolean;

  @Column()
  destinationId: number;

  // Destination과 연결
  @ManyToOne(() => Destination, (destination) => destination.spots, {
    onDelete: 'CASCADE', // 여행지가 삭제되면 해당 스팟도 삭제
  })
  @JoinColumn({ name: 'destinationId' })
  destination: Destination;

  @ManyToMany(() => Tag, (tag) => tag.spots)
  @JoinTable({ name: 'spot_tags' })
  tags: Tag[];
}
