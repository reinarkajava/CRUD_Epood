// backend/src/config/db.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false // Soovitus: Keela logimine arenduses
});

/**
 * Ühenduse loomine ja testimine andmebaasiga.
 * See funktsioon tuleb eksportida ja server.js-is käivitada.
 */
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('--- Database connection established successfully. ---');
  } catch (error) {
    // Viska viga üles, et server.js saaks sellega tegeleda ja käivituse peatada
    console.error('--- Unable to connect to the database: ---', error);
    throw new Error('Database connection failed.'); 
  }
};