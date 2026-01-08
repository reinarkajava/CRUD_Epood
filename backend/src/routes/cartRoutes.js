// backend/src/routes/productRoutes.js
import express from 'express';
import { getCart, createCart, addProductToCart } from '../controllers/cartController.js';

const router = express.Router();

// GET /api/carts
router.get('/:id', getCart);
router.post('/', createCart);
router.post('/:id/products', addProductToCart);

export default router;