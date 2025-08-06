import { Currency } from './currency.enum';
export declare class Product {
    productId: string;
    name: string;
    description: string;
    price: number;
    discount?: string;
    currency: Currency;
    productImage?: string;
    createdAt: String;
    updtedAt: String;
}
