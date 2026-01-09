// backend/src/routes/productRoutes.js
import express from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;