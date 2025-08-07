import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service'; // Import your service
import { CreateProductDto } from './dto/create-product.dto';
import { UsingJoinColumnIsNotAllowedError } from 'typeorm';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: Partial<ProductsService>;

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockImplementation((dto: CreateProductDto) => ({
        productId: '12345',
        ...dto,
      })),

      getOne: jest.fn().mockImplementation((productId: string) => ({
        productId,
        name: 'shop'
      })),

      getAll: jest.fn().mockImplementation(() => ([
        {
          productId: '12345',
          name: 'shop',
        },
        {
          productId: '123456',
          name: 'shop25'
        },
      ])),

      delete: jest.fn().mockImplementation(() => ({
        'raw': [],
        'affected': 1
      })),

      update: jest.fn().mockImplementation(() => ({
        'generatedMaps': [],
        'raw': [],
        'affected': 1
      }))
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'shop',
      price: 200,
      description: 'small stuff',
      discount: 100,
      currency: 'NGN',
    };

    await expect(controller.createProduct(dto)).resolves.toEqual(
      expect.objectContaining({
        productId: expect.any(String),
        name: 'shop',
      })
    );
  });

  it('Get a product by id', async () => {
        await expect(controller.getProduct("12345")).resolves.toEqual(
          expect.objectContaining({
            productId: "12345",
          })
        );
  });

  it('Get all products', async () => {
    await expect(controller.getAllProducts()).resolves.toEqual(
      expect.arrayContaining([
        {
          productId: '12345',
          name: 'shop',
        },
        {
          productId: '123456',
          name: 'shop25'
        },
      ])
    );
  });

  it('Delete a product', async () => {
    await expect(controller.deleteProduct("12345")).resolves.toEqual(
      expect.objectContaining({
        'raw': [],
        'affected': 1
      })
    )
  });

  it('Edit a product', async () => {
    await expect(controller.updateProduct('12345', {name: 'shop25'})).resolves.toEqual(
      expect.objectContaining({
        'generatedMaps': [],
        'raw': [],
        'affected': 1,
      })
    )
  });
});
