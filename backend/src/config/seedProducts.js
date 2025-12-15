// backend/src/config/seedProducts.js
import { Product } from '../models/Product.js';

export const seedProducts = async () => {
  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate([
      { name: 'T-särk', price: 19.99 },
      { name: 'Tõrvik', price: 9.99 },
      { name: 'Kott', price: 14.49 }
    ]);
    console.log('Seeded products');
  }
};
