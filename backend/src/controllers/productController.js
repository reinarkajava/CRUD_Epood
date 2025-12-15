
import * as service from '../services/productService.js';

export const create = async (req, res) => {
  const product = await service.createProduct(req.body);
  res.status(201).json(product);
};
