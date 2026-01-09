// backend/src/routes/productRoutes.js
import express from 'express';
import { getCart, checkout, createCart, addProductToCart, removeFromCart, updateCartItemQuantity } from '../controllers/cartController.js';

const router = express.Router();

// GET /api/carts
router.get('/:id', getCart);
router.post('/', createCart);
router.post('/:id/products', addProductToCart);
router.post('/:cartId/checkout', checkout);
router.delete('/:cartId/products/:productId', removeFromCart);
router.patch('/:cartId/products/:productId', updateCartItemQuantity);

export default router;