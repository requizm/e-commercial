import { Injectable } from '@nestjs/common';
import { Product } from 'src/db/entity/Product';
import { ProductRepository } from 'src/db/repository/ProductRepository';
import { getConnection } from 'typeorm';

@Injectable()
export class ProductService {
  productRepository: ProductRepository;
  constructor() {
    const connection = getConnection('default');
    this.productRepository = connection.getCustomRepository(ProductRepository);
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.getById(id);
  }

  async add(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<string> {
    const productTemp = await this.productRepository.getById(product.id);
    if (!productTemp) {
      return 'Product not found';
    }
    await this.productRepository.update(product.id, product);
    return '';
  }

  async delete(id: number): Promise<string> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      return 'Product not found';
    }
    await this.productRepository.delete(id);
    return '';
  }
}
