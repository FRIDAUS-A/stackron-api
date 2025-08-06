import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../entities/carts.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Product } from '../entities/products.entity';

@Injectable()
export class CartsService {
	constructor(
		@InjectRepository(Cart)
		private readonly cartRepository: Repository<Cart>,

		 @InjectRepository(Product)
    	private readonly productRepository: Repository<Product>,
	) {}

	async create(createCartDto: CreateCartDto): Promise<Cart> {
		const { productIds } = createCartDto;
		
		const products = await Promise.all(
			productIds.map(productId =>
				this.productRepository.findOne({ where: { productId } })
			)
		)

		if (products.length !== productIds.length) {
      		throw new NotFoundException('Some products not found');
    	}

		const cart = this.cartRepository.create({ products });

		return this.cartRepository.save(cart);
	}

	async getOne(cartId: string): Promise<Cart | null> {
		return this.cartRepository.findOne({ where: {cartId }, relations: ['products'],});
	}

	async getAll(): Promise<Cart[]> {
		return this.cartRepository.find({ relations: ['products']})
	}
}
