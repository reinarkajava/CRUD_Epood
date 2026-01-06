import { Product } from './Product.js';
import { Category } from './Category.js';
import { Cart } from './Cart.js';
import { CartItem } from './CartItem.js';

// Category ↔ Product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Cart ↔ Product (Many-to-Many)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

export {
  Product,
  Category,
  Cart,
  CartItem
};