import cartRepository from '../repositories/cartRepository.js';
import productRepository from '../repositories/productRepository.js';

export const createCart = async () => {
    return await cartRepository.create();
};

export const getCart = async (id) => {
    if (!id) {
        throw new Error('Ostukorvi ID on kohustuslik');
    }

    const cart = await cartRepository.findById(id);

    if (!cart) {
        return null;
    }

    // Map products to plain objects (like productService)
    const products = cart.Products.map(p => p.get({ plain: true }));

    return {
        ...cart.get({ plain: true }),
        Products: products
    };
};

export const addProduct = async (cartId, productId, quantity = 1) => {
    if (!cartId) throw new Error('Ostukorvi ID on kohustuslik');
    if (!productId) throw new Error('Toode on kohustuslik');
    if (quantity <= 0) throw new Error('Kogus peab olema suurem kui 0');

    // Optional: Validate product exists
    const product = await productRepository.findById(productId);
    if (!product) throw new Error('Toode ei leitud');

    // Add product via repository
    await cartRepository.addProduct(cartId, productId, quantity);

    // Return updated cart with products
    const cart = await cartRepository.findById(cartId);

    const products = cart.Products.map(p => p.get({ plain: true }));

    return {
        ...cart.get({ plain: true }),
        Products: products
    };
};
