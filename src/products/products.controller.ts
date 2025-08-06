import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../entities/products.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

	constructor(private productsService: ProductsService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async createProduct(@Body() product: CreateProductDto): Promise<Product> {
		return await this.productsService.create(product);
	}


	@Get(':productId')
	async getProduct(@Param('productId') productId: string): Promise<Product> {
		return await this.productsService.getOne(productId);
	}

	@Get()
	async getAllProducts(): Promise<Product[]> {
		return await this.productsService.getAll();
	}

	@Patch(':productId')
	@UsePipes(new ValidationPipe({ transform: true }))
	async updateProduct(@Param('productId') productId: string, @Body() productData: UpdateProductDto): Promise<UpdateResult> {
		return await this.productsService.update(productId, productData);
	}

	@Delete(':productId')
	async deleteProduct(@Param('productId') productId: string): Promise<DeleteResult> {
		return await this.productsService.delete(productId);
	}

}
