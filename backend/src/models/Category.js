import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

//vähemalt üks üks-paljudele seos => loome kategooriad
export const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false }
});