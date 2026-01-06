import CartService from '../services/cart.service.js';

class CartController {
    async createCart(req, res) {
        const cart = await CartService.createCart();
        res.status(201).json(cart);
    }

    async getCart(req, res) {
        const cart = await CartService.getCart(req.params.id);
        res.json(cart);
    }

    async addProduct(req, res) {
        const { productId, quantity } = req.body;
        await CartService.addToCart(req.params.id, productId, quantity);
        res.status(204).end();
    }

    async updateQuantity(req, res) {
        const { quantity } = req.body;
        await CartService.updateQuantity(req.params.id, req.params.productId, quantity);
        res.status(204).end();
    }

    async removeProduct(req, res) {
        await CartService.removeFromCart(req.params.id, req.params.productId);
        res.status(204).end();
    }
}

export default new CartController();
