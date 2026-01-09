import * as cartService from '../services/cartService.js';
import { CartItem } from '../models/CartItem.js';

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

export const checkout = async (req, res) => {
    try {
        const { cartId } = req.params;
        // Kustutame kõik seosed CartItem tabelist selle cartId puhul
        await CartItem.destroy({ where: { CartId: cartId } });
        
        res.status(200).json({ message: 'Tellimus vormistatud!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    
    // Kustutame konkreetse toote sellest ostukorvist
    const deleted = await CartItem.destroy({
      where: {
        CartId: cartId,
        ProductId: productId
      }
    });

if (deleted) {
      return res.status(200).json({ message: 'Toode eemaldatud!' });
    }
    res.status(404).json({ message: 'Toodet ei leitud' });
  } catch (error) {
    console.error("Kustutamise viga:", error); // See näitab viga serveri terminalis
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body; // Uus soovitud kogus

    const item = await CartItem.findOne({
      where: { CartId: cartId, ProductId: productId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Toodet ei leitud' });
    }

    item.quantity = quantity;
    await item.save();
    
    res.status(200).json({ message: 'Kogus uuendatud' });
  } catch (error) {
    console.error("Uuendamise viga:", error);
    res.status(500).json({ error: error.message });
  }
};