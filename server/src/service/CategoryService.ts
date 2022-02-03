import { Injectable } from '@nestjs/common';
import { Category } from 'src/db/entity/Category';
import { CategoryRepository } from 'src/db/repository/CategoryRepository';
import { ProductRepository } from 'src/db/repository/ProductRepository';
import { getConnection } from 'typeorm';

@Injectable()
export class CategoryService {
  categoryRepository: CategoryRepository;
  productRepository: ProductRepository;
  constructor() {
    const connection = getConnection('default');
    this.categoryRepository =
      connection.getCustomRepository(CategoryRepository);
    this.productRepository = connection.getCustomRepository(ProductRepository);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }

  async getById(id: number): Promise<Category> {
    return await this.categoryRepository.getById(id);
  }

  async add(category: Category) {
    if (category.parent) {
      const children = await this.categoryRepository.getChildren(
        category.parent,
      );
      children.find((child) => {
        if (child.name === category.name) {
          return null;
        }
      });
    }
    return await this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<string> {
    const categoryTemp = await this.categoryRepository.getById(category.id);
    if (!categoryTemp) {
      return 'Category not found';
    }
    await this.categoryRepository.update(category.id, category);
    return '';
  }

  async delete(id: number): Promise<string> {
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      return 'Category not found';
    }
    const children = await this.categoryRepository.getChildren(category);
    if (children.length > 0) {
      return "There are children categories, you can't delete this category";
    }
    const products = await this.productRepository.getByCategory(category);
    if (products.length > 0) {
      return "There are products in this category, you can't delete this category";
    }
    await this.categoryRepository.delete(id);
    return '';
  }
}
