import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { CartItem } from '../models/CartItem.js';

class CartRepository {
    // Create a new cart
    async create() {
        return await Cart.create();
    }

    // Get cart by ID with products
    async findById(id) {
        return await Cart.findByPk(id, {
            include: {
                model: Product,
                through: { attributes: ['quantity', 'price'] }
            }
        });
    }

    // Add product to cart
    async addProduct(cartId, productId, quantity = 1) {
        const cart = await this.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        const product = await Product.findByPk(productId);
        if (!product) throw new Error('Product not found');

        let item = await CartItem.findOne({
            where: { CartId: cartId, ProductId: productId }
        });

        if (item) {
            // If product already in cart, increment quantity
            item.quantity += quantity;
            await item.save();
            return item;
        } else {
            // Otherwise, create a new CartItem
            const product = await Product.findByPk(productId);
            if (!product) throw new Error('Product not found');

            return await CartItem.create({
                CartId: cartId,
                ProductId: productId,
                quantity,
                price: product.price
            });
        }
    }

    // Update quantity of a product in the cart
    async updateQuantity(cartId, productId, quantity) {
        return await CartItem.update(
            { quantity },
            { where: { CartId: cartId, ProductId: productId } }
        );
    }

    // Remove product from cart
    async removeProduct(cartId, productId) {
        return await CartItem.destroy({
            where: { CartId: cartId, ProductId: productId }
        });
    }
}

export default new CartRepository();
