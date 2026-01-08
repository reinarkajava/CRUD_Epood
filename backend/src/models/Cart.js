import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Product } from './Product.js';
import { CartItem } from './CartItem.js';

export const Cart = sequelize.define('Cart', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
});

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });