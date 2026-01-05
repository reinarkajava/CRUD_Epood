import productRepository from '../repositories/productRepository.js';

export const getAllProducts = async () => {
    const products = await productRepository.findAll();
    
// ÄRIREEGEL: Lisame staatuse ja arvutame soodushinna
    return products.map(p => {
        const product = p.get({ plain: true });
        return {
            ...product,
            status: product.price > 15 ? 'Premium' : 'Soodne',
            discountPrice: (product.price * 0.85).toFixed(2) // 15% allahindlust
        };
    });
};
export const createProduct = async (data) => {
    if (!data.name || data.price <= 0) {
        throw new Error('Toote nimi ja korrektne hind on kohustuslikud!');
    }
    return await productRepository.create(data);
};
export const deleteProduct = async (id) => {
    return await productRepository.delete(id);
};