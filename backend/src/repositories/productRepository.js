import { Product } from '../models/Product.js';

class ProductRepository {
    async findAll() {
        // võib tulevikus lisada ka seotud kategooria: { include: Category }
        return await Product.findAll();
    }

    async create(data) {
        return await Product.create(data);
    }
}

export default new ProductRepository();