// backend/src/server.js
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { sequelize } from './config/db.js';
import { Product } from './models/Product.js'; 
import './models/CartItem.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { seedProducts } from './config/seedProducts.js';

const app = express();
const server = http.createServer(app);

// 4. Socket.IO seadistus
const io = new Server(server, {
    cors: {
        // Lubab Vite arendusserveril ühenduda
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});

// Socket.IO instantsi salvestamine Expressi rakendusse
app.set('socketio', io);

// Express CORS seadistus (lubab frontend'i päringud)
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

io.on('connection', socket => {
  console.log('Client connected to Socket.IO', socket.id);
  // Näide: socket.emit('notification', { message: 'Tere tulemast!' });
});

// 3. ASÜNKROONNE KÄIVITUSFUNKTSIOON (Vigade käitlemiseks)
const startServer = async () => {
    try {
        await sequelize.authenticate();
        
        // Sünkroniseeri mudelid (loob tabeli, kui seda pole, või muudab seda)
        await sequelize.sync({ alter: true }); //nüüd andmed säilivad
        console.log("Andmebaas on ühendatud!");

        server.listen(3000, () => console.log('Server jookseb socket.io-ga pordil 3000'));
  } catch (error) {
    console.error('Viga käivitamisel:', error);
  }
};

startServer();