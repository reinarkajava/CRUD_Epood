// backend/tests/unit/services/productService.test.js
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Create mock repository before importing service
const mockProductRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
};

// Mock the repository module
jest.unstable_mockModule('../../../src/repositories/productRepository.js', () => ({
    default: mockProductRepository
}));

// Now import the service (after mocking)
const { getAllProducts, createProduct, deleteProduct } = await import('../../../src/services/productService.js');

describe('ProductService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('should return products with status and discountPrice', async () => {
            // Mock repository response (Sequelize model with get method)
            const mockProducts = [
                {
                    id: 1,
                    name: 'Premium Product',
                    price: 20.00,
                    image: 'test.jpg',
                    get: jest.fn(() => ({
                        id: 1,
                        name: 'Premium Product',
                        price: 20.00,
                        image: 'test.jpg',
                        categoryId: 1
                    }))
                },
                {
                    id: 2,
                    name: 'Cheap Product',
                    price: 10.00,
                    image: 'test2.jpg',
                    get: jest.fn(() => ({
                        id: 2,
                        name: 'Cheap Product',
                        price: 10.00,
                        image: 'test2.jpg',
                        categoryId: 1
                    }))
                }
            ];

            mockProductRepository.findAll.mockResolvedValue(mockProducts);

            const result = await getAllProducts();

            expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(2);
            
            // Check Premium product
            expect(result[0].status).toBe('Premium');
            expect(result[0].discountPrice).toBe('17.00'); // 20 * 0.85 = 17.00
            
            // Check Cheap product
            expect(result[1].status).toBe('Soodne');
            expect(result[1].discountPrice).toBe('8.50'); // 10 * 0.85 = 8.50
        });

        it('should handle empty product list', async () => {
            mockProductRepository.findAll.mockResolvedValue([]);

            const result = await getAllProducts();

            expect(result).toHaveLength(0);
            expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('createProduct', () => {
        it('should create product with valid data', async () => {
            const mockProduct = {
                id: 1,
                name: 'New Product',
                price: 15.99,
                image: 'new.jpg'
            };

            mockProductRepository.create.mockResolvedValue(mockProduct);

            const result = await createProduct({
                name: 'New Product',
                price: 15.99,
                image: 'new.jpg'
            });

            expect(mockProductRepository.create).toHaveBeenCalledWith({
                name: 'New Product',
                price: 15.99,
                image: 'new.jpg'
            });
            expect(result).toEqual(mockProduct);
        });

        it('should throw error when name is missing', async () => {
            await expect(createProduct({
                price: 15.99
            })).rejects.toThrow('Toote nimi ja korrektne hind on kohustuslikud!');

            expect(mockProductRepository.create).not.toHaveBeenCalled();
        });

        it('should throw error when price is missing', async () => {
            // Service checks: !data.price || data.price <= 0
            // When price is undefined, !undefined is true, so it should throw
            await expect(createProduct({
                name: 'Product'
            })).rejects.toThrow('Toote nimi ja korrektne hind on kohustuslikud!');

            expect(mockProductRepository.create).not.toHaveBeenCalled();
        });

        it('should throw error when price is zero or negative', async () => {
            await expect(createProduct({
                name: 'Product',
                price: 0
            })).rejects.toThrow('Toote nimi ja korrektne hind on kohustuslikud!');

            await expect(createProduct({
                name: 'Product',
                price: -5
            })).rejects.toThrow('Toote nimi ja korrektne hind on kohustuslikud!');

            expect(mockProductRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('deleteProduct', () => {
        it('should delete product by id', async () => {
            mockProductRepository.delete.mockResolvedValue(1);

            const result = await deleteProduct(1);

            expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
            expect(result).toBe(1);
        });

        it('should handle non-existent product deletion', async () => {
            mockProductRepository.delete.mockResolvedValue(0);

            const result = await deleteProduct(999);

            expect(mockProductRepository.delete).toHaveBeenCalledWith(999);
            expect(result).toBe(0);
        });
    });
});
