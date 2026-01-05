// backend/src/server.js
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

// 1. IMPORDIME ühenduse db.js-ist
import { sequelize, connectDB } from './config/db.js';
// 2. IMPORDIME mudeli (et see oleks defineeritud)
import { Product } from './models/Product.js'; 
import productRoutes from './routes/productRoutes.js';
import { seedProducts } from './config/seedProducts.js';

const app = express();
const server = http.createServer(app);

// 4. MÄÄRAME Socket.IO CORS
const io = new Server(server, {
    cors: {
        // See lubab Vite arendusserveril ühenduda
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});

// Express CORS seadistus (lubab frontend'i päringud)
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use('/api/products', productRoutes);

io.on('connection', socket => {
  console.log('Client connected to Socket.IO');
  // Näide: socket.emit('notification', { message: 'Tere tulemast!' });
});

// 3. ASÜNKROONNE KÄIVITUSFUNKTSIOON (Vigade käitlemiseks)
const startServer = async () => {
    try {
        await connectDB(); // Kontrolli andmebaasi ühendust (db.js-ist)
        
        // Sünkroniseeri mudelid (loob tabeli, kui seda pole, või muudab seda)
        await sequelize.sync({ force: false }); //nüüd andmed säilivad
        
        await seedProducts(); // Seemenda andmed

        server.listen(3000, () => {
            console.log('Backend running on http://localhost:3000');
        });
    } catch (error) {
        console.error('SERVER FAILED TO START:', error);
        // Võimalik siin protsess sulgeda, kui viga on kriitiline
        process.exit(1); 
    }
};

startServer();