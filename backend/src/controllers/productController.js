// backend/src/controllers/productController.js
import * as productService from '../services/productService.js';
import { Product } from '../models/Product.js'; // See rida on kriitiline!

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Viga toodete hankimisel:', error);
    res.status(500).json({ message: "Serveri viga" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    // Loome toote otse mudeli kaudu, et image väli kindlasti salvestuks
    const product = await Product.create({ 
      name, 
      price: parseFloat(price), 
      image: image || null 
    });

    // Teavitus Socket.io kaudu
    const io = req.app.get('socketio');
    if (io) {
      io.emit('product_added', { message: `Uus toode "${name}" on lisatud!` });
    }

    res.status(201).json(product);
  } catch (error) {
    console.error('Viga toote loomisel:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};