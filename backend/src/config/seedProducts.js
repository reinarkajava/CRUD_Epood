import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

export const seedProducts = async () => {
  const catCount = await Category.count();
  if (catCount === 0) {
    const clothes = await Category.create({ name: 'Riided' });
    const tools = await Category.create({ name: 'Tööriistad' });

    await Product.bulkCreate([
      { name: 'T-särk', price: 19.99, categoryId: clothes.id },
      { name: 'Tõrvik', price: 9.99, categoryId: tools.id },
      { name: 'Kott', price: 14.49, categoryId: clothes.id }
    ]);
    console.log('Andmebaas on täidetud!');
  }
};