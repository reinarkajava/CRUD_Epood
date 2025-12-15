
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT
});
