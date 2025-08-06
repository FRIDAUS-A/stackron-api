import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateProductDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	price: number;

	@IsNotEmpty()
	currency: string;

	@IsNotEmpty()
	discount: number;

	@IsNotEmpty()
	description: string;

	@IsOptional()
	productImage?: string;
}