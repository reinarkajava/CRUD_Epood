import * as cartService from '../services/cartService.js';

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart();
        // IMPORTANT: return the cart JSON so frontend can get cart.id
        res.status(201).json(cart);
    } catch (error) {
        console.error('Viga ostukorvi loomisel:', error);
        res.status(500).json({ message: 'Serveri viga' });
    }
};

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await cartService.getCart(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Ostukorv ei leitud' });
        }

        // Return cart including products
        res.status(200).json(cart);
    } catch (error) {
        console.error('Viga ostukorvi hankimisel:', error);
        res.status(500).json({ message: 'Serveri viga' });
    }
};

// Add product to cart
export const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.id;          // cart ID from URL
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({ message: 'Toode ja kogus on kohustuslikud' });
        }

        await cartService.addProduct(cartId, productId, quantity);

        // Return updated cart
        const cart = await cartService.getCart(cartId);
        res.status(200).json(cart);
    } catch (error) {
        console.error('Viga toote lisamisel ostukorvi:', error);
        res.status(500).json({ message: 'Serveri viga' });
    }
};

