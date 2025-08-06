import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

describe('CartsController', () => {
  let controller: CartsController;
  let mockService: Partial<CartsService>;

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockImplementation((dto: CreateCartDto) => ({
        cartId: 'cart123',
        products: [{}],
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        {
          provide: CartsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a product to cart', async () => {
    const dto: CreateCartDto = {
      productIds: ['prod123'],
    };

    await expect(controller.createCart(dto)).resolves.toEqual(
      expect.objectContaining({
        cartId: expect.any(String),
        products: expect.arrayContaining([
          expect.any(Object),
        ]),
      })
    );

    expect(mockService.create).toHaveBeenCalledWith(dto);
  });
});
