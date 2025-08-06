import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../entities/carts.entity';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';

describe('CartsService', () => {
  let service: CartsService;
  let cartRepo: Repository<Cart>;
  let productRepo: Repository<Product>;

  const mockCartRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockProductRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: getRepositoryToken(Cart), useValue: mockCartRepository },
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartRepo = module.get(getRepositoryToken(Cart));
    productRepo = module.get(getRepositoryToken(Product));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cart with valid products', async () => {
    const productIds = ['prod1', 'prod2'];
    const fakeProducts = [
      { productId: 'prod1' },
      { productId: 'prod2' }
    ];

    // Mock product lookups
    mockProductRepository.findOne
      .mockResolvedValueOnce(fakeProducts[0])
      .mockResolvedValueOnce(fakeProducts[1]);

    mockCartRepository.create.mockReturnValue({ products: fakeProducts });
    mockCartRepository.save.mockResolvedValue({ cartId: 'cart123', products: fakeProducts });

    const result = await service.create({productIds});

    expect(mockProductRepository.findOne).toHaveBeenCalledTimes(2);
    expect(mockCartRepository.create).toHaveBeenCalledWith({ products: fakeProducts });
    expect(result.cartId).toBe('cart123');
    expect(result.products).toEqual(fakeProducts);
  });
});
