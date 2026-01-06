import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Cart = sequelize.define('Cart', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
});