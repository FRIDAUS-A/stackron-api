import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsService } from './carts.service';
import { Cart } from '../entities/carts.entity';

@Controller('/api/v1/carts')
export class CartsController {
	constructor(private readonly cartsService: CartsService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async createCart(@Body() products: CreateCartDto): Promise<Cart> {
		return this.cartsService.create(products);
	}

	@Get(':cartId')
	async getCart(@Param('cartId') cartId: string): Promise<Cart> {
		return this.cartsService.getOne(cartId);
	}

	@Get()
	async getAllCart(): Promise<Cart[]> {
		return this.cartsService.getAll();
	}
}
