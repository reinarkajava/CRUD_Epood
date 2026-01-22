// backend/tests/unit/services/cartService.test.js
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Create mock repositories before importing service
const mockCartRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    addProduct: jest.fn()
};

const mockProductRepository = {
    findById: jest.fn()
};

// Mock the repository modules
jest.unstable_mockModule('../../../src/repositories/cartRepository.js', () => ({
    default: mockCartRepository
}));

jest.unstable_mockModule('../../../src/repositories/productRepository.js', () => ({
    default: mockProductRepository
}));

// Now import the service (after mocking)
const { createCart, getCart, addProduct } = await import('../../../src/services/cartService.js');

describe('CartService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCart', () => {
        it('should create a new cart', async () => {
            const mockCart = {
                id: 1,
                status: 'active',
                get: jest.fn(() => ({
                    id: 1,
                    status: 'active'
                }))
            };

            mockCartRepository.create.mockResolvedValue(mockCart);

            const result = await createCart();

            expect(mockCartRepository.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockCart);
        });
    });

    describe('getCart', () => {
        it('should return cart with products', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Product 1',
                    price: 10.00,
                    get: jest.fn(() => ({
                        id: 1,
                        name: 'Product 1',
                        price: 10.00
                    }))
                }
            ];

            const mockCart = {
                id: 1,
                status: 'active',
                Products: mockProducts,
                get: jest.fn(() => ({
                    id: 1,
                    status: 'active'
                }))
            };

            mockCartRepository.findById.mockResolvedValue(mockCart);

            const result = await getCart(1);

            expect(mockCartRepository.findById).toHaveBeenCalledWith(1);
            expect(result).toHaveProperty('id', 1);
            expect(result).toHaveProperty('status', 'active');
            expect(result.Products).toHaveLength(1);
            expect(result.Products[0]).toHaveProperty('id', 1);
        });

        it('should return null when cart not found', async () => {
            mockCartRepository.findById.mockResolvedValue(null);

            const result = await getCart(999);

            expect(mockCartRepository.findById).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        });

        it('should throw error when id is missing', async () => {
            await expect(getCart(null)).rejects.toThrow('Ostukorvi ID on kohustuslik');
            await expect(getCart(undefined)).rejects.toThrow('Ostukorvi ID on kohustuslik');
            await expect(getCart('')).rejects.toThrow('Ostukorvi ID on kohustuslik');

            expect(mockCartRepository.findById).not.toHaveBeenCalled();
        });
    });

    describe('addProduct', () => {
        it('should add product to cart with valid data', async () => {
            const mockProduct = {
                id: 1,
                name: 'Product 1',
                price: 10.00,
                get: jest.fn(() => ({
                    id: 1,
                    name: 'Product 1',
                    price: 10.00
                }))
            };

            const mockCart = {
                id: 1,
                status: 'active',
                Products: [mockProduct],
                get: jest.fn(() => ({
                    id: 1,
                    status: 'active'
                }))
            };

            mockProductRepository.findById.mockResolvedValue(mockProduct);
            mockCartRepository.addProduct.mockResolvedValue();
            // cartRepository.findById is called twice in addProduct - first to validate, second to return updated cart
            mockCartRepository.findById
                .mockResolvedValueOnce(mockCart) // First call (validation - not used in current implementation)
                .mockResolvedValueOnce(mockCart); // Second call (return updated cart)

            const result = await addProduct(1, 1, 2);

            expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
            expect(mockCartRepository.addProduct).toHaveBeenCalledWith(1, 1, 2);
            expect(result).toHaveProperty('id', 1);
            expect(result.Products).toHaveLength(1);
        });

        it('should throw error when cartId is missing', async () => {
            await expect(addProduct(null, 1, 1)).rejects.toThrow('Ostukorvi ID on kohustuslik');
            await expect(addProduct(undefined, 1, 1)).rejects.toThrow('Ostukorvi ID on kohustuslik');

            expect(mockCartRepository.addProduct).not.toHaveBeenCalled();
        });

        it('should throw error when productId is missing', async () => {
            await expect(addProduct(1, null, 1)).rejects.toThrow('Toode on kohustuslik');
            await expect(addProduct(1, undefined, 1)).rejects.toThrow('Toode on kohustuslik');

            expect(mockCartRepository.addProduct).not.toHaveBeenCalled();
        });

        it('should throw error when quantity is zero or negative', async () => {
            await expect(addProduct(1, 1, 0)).rejects.toThrow('Kogus peab olema suurem kui 0');
            await expect(addProduct(1, 1, -1)).rejects.toThrow('Kogus peab olema suurem kui 0');

            expect(mockCartRepository.addProduct).not.toHaveBeenCalled();
        });

        it('should throw error when product does not exist', async () => {
            mockProductRepository.findById.mockResolvedValue(null);

            await expect(addProduct(1, 999, 1)).rejects.toThrow('Toode ei leitud');

            expect(mockProductRepository.findById).toHaveBeenCalledWith(999);
            expect(mockCartRepository.addProduct).not.toHaveBeenCalled();
        });

        it('should use default quantity of 1 when not provided', async () => {
            const mockProduct = {
                id: 1,
                name: 'Product 1',
                price: 10.00,
                get: jest.fn(() => ({
                    id: 1,
                    name: 'Product 1',
                    price: 10.00
                }))
            };

            const mockCart = {
                id: 1,
                status: 'active',
                Products: [mockProduct],
                get: jest.fn(() => ({
                    id: 1,
                    status: 'active'
                }))
            };

            mockProductRepository.findById.mockResolvedValue(mockProduct);
            mockCartRepository.findById
                .mockResolvedValueOnce(mockCart)
                .mockResolvedValueOnce(mockCart);

            await addProduct(1, 1);

            expect(mockCartRepository.addProduct).toHaveBeenCalledWith(1, 1, 1);
        });
    });
});
