import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
	
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async create(productData: CreateProductDto): Promise<Product> {
		const productEntity = plainToInstance(Product, productData);
		// const productEntity = this.productRepository.create(productData)
		const newProduct = this.productRepository.save(productEntity);
		return newProduct;
	}

	async getOne(productId: string): Promise<Product> {
		const product = this.productRepository.findOne({where: { productId }});
		if (!product) throw new NotFoundException('product does not exist');
		return product;
	}

	async getAll(): Promise<Product[]> {
		return await this.productRepository.find();
	}

	async update(productId: string, productData: UpdateProductDto): Promise<UpdateResult> {
		const product = this.productRepository.findOne({where: { productId }});
		if (!product) throw new NotFoundException('product does not exist');
		
		const productEntity = plainToInstance(Product, productData);
		return await this.productRepository.update(productId, productEntity);

	}

	async delete(productId: string): Promise<DeleteResult> {
		const product = this.productRepository.findOne({where: { productId }});
		if (!product) throw new NotFoundException('product does not exist');
			
		return await this.productRepository.delete({productId});
	}
}
