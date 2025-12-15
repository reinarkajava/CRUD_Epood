// backend/src/controllers/productController.js
import { Product } from '../models/Product.js';

/**
 * Hangi kõik tooted
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};