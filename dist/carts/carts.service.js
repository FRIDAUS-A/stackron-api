"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const carts_entity_1 = require("../entities/carts.entity");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../entities/products.entity");
let CartsService = class CartsService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async create(createCartDto) {
        const { productIds } = createCartDto;
        const products = await Promise.all(productIds.map(productId => this.productRepository.findOne({ where: { productId } })));
        if (products.length !== productIds.length) {
            throw new common_1.NotFoundException('Some products not found');
        }
        const cart = this.cartRepository.create({ products });
        return this.cartRepository.save(cart);
    }
    async getOne(cartId) {
        return this.cartRepository.findOne({ where: { cartId }, relations: ['products'], });
    }
    async getAll() {
        return this.cartRepository.find({ relations: ['products'] });
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carts_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartsService);
//# sourceMappingURL=carts.service.js.map