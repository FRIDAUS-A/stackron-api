import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Currency } from './currency.enum';

@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	productId!: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number

	@Column({ nullable: true })
	discount?: string;

	@Column({
		type: 'text',
	})
	currency: Currency

	@Column({ nullable: true })
	productImage?: string

	@CreateDateColumn()
   	createdAt: String

   	@UpdateDateColumn()
   	updtedAt: String
}