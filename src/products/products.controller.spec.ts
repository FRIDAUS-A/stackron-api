import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service'; // Import your service
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: Partial<ProductsService>;

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockImplementation((dto: CreateProductDto) => ({
        productId: '12345',
        ...dto,
      })),
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
});
