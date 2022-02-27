import { getConnectionManager } from 'typeorm';

import { Inject, Injectable, Optional } from '@nestjs/common';

import { Category } from '../db/entity/Category';
import { CategoryRepository } from '../db/repository/CategoryRepository';
import { ProductRepository } from '../db/repository/ProductRepository';
import { CategoryDto } from '../dto/CategoryDto';
import { Result } from '../dto/Result';

@Injectable()
export class CategoryService {
    constructor(@Optional() @Inject("productRepository") private productRepository: ProductRepository, @Optional() @Inject("categoryRepository") private categoryRepository: CategoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        if (!this.productRepository) {
            this.productRepository = getConnectionManager().get("default").getCustomRepository(ProductRepository);
        }
        if (!this.categoryRepository) {
            this.categoryRepository = getConnectionManager().get("default").getCustomRepository(CategoryRepository);
        }
    }

    async getAll(): Promise<Result> {
        const data = await this.categoryRepository.getAll();
        return new Result({ data: data });
    }

    async getById(id: number): Promise<Result> {
        if (!id) {
            return new Result({ message: "Missing fields" });
        }
        const data = await this.categoryRepository.getById(id);
        if (!data) {
            return new Result({ message: "Category not found" });
        }
        return new Result({ data: data });
    }

    async add(categoryDto: CategoryDto): Promise<Result> {
        const category = categoryDto.toCategory() as Category;
        if (!category.name) {
            return new Result({ message: "Missing fields" });
        }
        let children: Category[] = [];
        if (category.parent) {
            children = await this.categoryRepository.getChildren(
                category.parent,
            );
        }
        else {
            children = await this.categoryRepository.getRootChildren();
        }
        if (children.filter(child => child.name === category.name).length > 0) {
            return new Result({ message: "Category with this name already exists" });
        }
        const data = await this.categoryRepository.save(category);
        return new Result({ data: data });
    }

    async update(category: Category): Promise<Result> {
        if (!category.name || !category.id) {
            return new Result({ message: "Missing fields" });
        }
        const categoryTemp = await this.categoryRepository.getById(category.id);
        if (!categoryTemp) {
            return new Result({ message: "Category not found" });
        }

        if (category.id == Number(category.parent)) {
            return new Result({
                message: "Category can't be parent of itself",
            });
        }

        let children: Category[] = [];
        if (category.parent) {
            children = await this.categoryRepository.getChildren(
                category.parent,
            );
        }
        else {
            children = await this.categoryRepository.getRootChildren();
        }
        if (children.filter(child => child.name === category.name).length > 0) {
            return new Result({ message: "Category with this name already exists" });
        }
        await this.categoryRepository.update(category.id, category);
        return new Result({});
    }

    async delete(id: number): Promise<Result> {
        if (!id) {
            return new Result({ message: "Missing fields" });
        }
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            return new Result({ message: "Category not found" });
        }
        const children = await this.categoryRepository.getChildren(category);
        if (children.length > 0) {
            return new Result({
                message:
                    "There are children categories, you can't delete this category",
            });
        }
        const products = await this.productRepository.getByCategory(category);
        if (products.length > 0) {
            return new Result({
                message:
                    "There are products in this category, you can't delete this category",
            });
        }
        await this.categoryRepository.delete(id);
        return new Result({});
    }
}
