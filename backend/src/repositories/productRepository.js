import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

class ProductRepository {
    async findAll() {
        // Toome kõik tooted andmebaasist, lseme koos kategooriaga, et täita seose nõue
        return await Product.findAll({ include: Category });
    }

    // Loome uue toote
    async create(data) {
        return await Product.create(data);
    }
    
    // Kustutame toote ID alusel
    async delete(id) {
    return await Product.destroy({ where: { id } });
    
    }

    // Kustutame toote ID alusel
    async findById(id) {
    return await Product.findOne({ where: { id } });
    
}
}

export default new ProductRepository();