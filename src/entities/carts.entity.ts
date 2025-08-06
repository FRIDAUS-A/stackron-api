import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinTable, ManyToMany} from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Cart {
	@PrimaryGeneratedColumn('uuid')
	cartId!: string

	@ManyToMany(() => Product, { cascade: false })
	@JoinTable()
	products!: Product[];

	@CreateDateColumn()
   	createdAt: String

   	@UpdateDateColumn()
   	updtedAt: String
}