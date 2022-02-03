import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getAll(): Promise<Product[]> {
    return await this.find({ relations: ['category'] });
  }

  async getById(id: number): Promise<Product> {
    return await this.findOne({
      where: { id: id },
      relations: ['category'],
    });
  }

  async getByCategory(category: Category): Promise<Product[]> {
    return await this.find({
      where: { category: category },
      relations: ['category'],
    });
  }
}
