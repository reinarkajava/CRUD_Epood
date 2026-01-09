import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Category } from './Category.js';

export const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: {
    type: DataTypes.STRING,
    allowNull: true // Pilt ei ole kohustuslik
  }
});

// Üks-paljudele seos
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });