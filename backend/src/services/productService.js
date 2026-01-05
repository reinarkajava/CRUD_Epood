import productRepository from '../repositories/productRepository.js';

export const getAllProducts = async () => {
    const products = await productRepository.findAll();
    
    // NÄIDE ÄRIREEGLIST: Lisame igale tootele dünaamilise "stockStatus"
    return products.map(p => ({
        ...p.toJSON(),
        isExpensive: p.price > 15 ? 'Premium' : 'Budget'
    }));
};

export const createNewProduct = async (data) => {
    if (data.price < 0) throw new Error("Hind ei saa olla negatiivne!");
    return await productRepository.create(data);
};
