import { Cart } from '../entities/carts.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Product } from '../entities/products.entity';
export declare class CartsService {
    private readonly cartRepository;
    private readonly productRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    create(createCartDto: CreateCartDto): Promise<Cart>;
    getOne(cartId: string): Promise<Cart | null>;
    getAll(): Promise<Cart[]>;
}
