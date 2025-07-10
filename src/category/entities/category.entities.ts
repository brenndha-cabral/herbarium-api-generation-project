import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entities';

@Entity({ name: 'tb_category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 45, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity[];
}
