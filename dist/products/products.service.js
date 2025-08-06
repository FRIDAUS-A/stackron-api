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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(productData) {
        const productEntity = (0, class_transformer_1.plainToInstance)(products_entity_1.Product, productData);
        const newProduct = this.productRepository.save(productEntity);
        return newProduct;
    }
    async getOne(productId) {
        const product = this.productRepository.findOne({ where: { productId } });
        if (!product)
            throw new common_1.NotFoundException('product does not exist');
        return product;
    }
    async getAll() {
        return await this.productRepository.find();
    }
    async update(productId, productData) {
        const product = this.productRepository.findOne({ where: { productId } });
        if (!product)
            throw new common_1.NotFoundException('product does not exist');
        const productEntity = (0, class_transformer_1.plainToInstance)(products_entity_1.Product, productData);
        return await this.productRepository.update(productId, productEntity);
    }
    async delete(productId) {
        const product = this.productRepository.findOne({ where: { productId } });
        if (!product)
            throw new common_1.NotFoundException('product does not exist');
        return await this.productRepository.delete({ productId });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map