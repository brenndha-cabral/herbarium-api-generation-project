import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entities';

@Entity({ name: 'tb_product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 45, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  brand: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 19, scale: 4 })
  price: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  age_rating: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  stock: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  validate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
