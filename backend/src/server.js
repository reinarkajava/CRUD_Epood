
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import productRoutes from './routes/productRoutes.js';
import { sequelize } from './config/db.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use('/api/products', productRoutes);

io.on('connection', socket => {
  console.log('Client connected');
});

await sequelize.sync();

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
