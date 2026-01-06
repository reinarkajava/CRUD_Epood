import CartRepository from '../repositories/cart.repository.js';

class CartService {
    async createCart() {
        return await CartRepository.create();
    }

    async getCart(id) {
        return await CartRepository.findById(id);
    }

    async addToCart(cartId, productId, quantity) {
        return await CartRepository.addProduct(cartId, productId, quantity);
    }

    async updateQuantity(cartId, productId, quantity) {
        return await CartRepository.updateQuantity(cartId, productId, quantity);
    }

    async removeFromCart(cartId, productId) {
        return await CartRepository.removeProduct(cartId, productId);
    }
}

export default new CartService();
