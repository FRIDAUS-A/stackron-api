import { Product } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(productData: CreateProductDto): Promise<Product>;
    getOne(productId: string): Promise<Product>;
    getAll(): Promise<Product[]>;
    update(productId: string, productData: UpdateProductDto): Promise<UpdateResult>;
    delete(productId: string): Promise<DeleteResult>;
}
