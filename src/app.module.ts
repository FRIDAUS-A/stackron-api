import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { CartsModule } from './carts/carts.module';
import { Cart } from './entities/carts.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [Product, Cart],
    synchronize: true,
    }),
    ProductsModule,
    CartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
