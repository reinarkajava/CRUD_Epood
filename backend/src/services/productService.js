
import { Product } from '../models/Product.js';

export const createProduct = async (data) => {
  return Product.create(data);
};
