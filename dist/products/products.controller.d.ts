import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../entities/products.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    createProduct(product: CreateProductDto): Promise<Product>;
    getProduct(productId: string): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    updateProduct(productId: string, productData: UpdateProductDto): Promise<UpdateResult>;
    deleteProduct(productId: string): Promise<DeleteResult>;
}
