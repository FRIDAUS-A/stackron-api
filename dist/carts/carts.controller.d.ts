import { CreateCartDto } from './dto/create-cart.dto';
import { CartsService } from './carts.service';
import { Cart } from '../entities/carts.entity';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    createCart(products: CreateCartDto): Promise<Cart>;
    getCart(cartId: string): Promise<Cart>;
    getAllCart(): Promise<Cart[]>;
}
