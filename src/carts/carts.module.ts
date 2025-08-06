import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Cart } from 'src/entities/carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart])],
  providers: [CartsService],
  controllers: [CartsController]
})
export class CartsModule {}
