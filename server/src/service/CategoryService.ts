import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/db/entity/Category";
import { CategoryRepository } from "src/db/repository/CategoryRepository";
import { ProductRepository } from "src/db/repository/ProductRepository";
import { Result } from "src/dto/Result";
import { getConnection } from "typeorm";

@Injectable()
export class CategoryService {
    categoryRepository: CategoryRepository;
    productRepository: ProductRepository;
    constructor(@Inject("connectionName") private connectionName: string) {
        const connection = getConnection(this.connectionName);
        this.categoryRepository = connection.getCustomRepository(
            CategoryRepository
        );
        this.productRepository = connection.getCustomRepository(
            ProductRepository
        );
    }

    async getAll(): Promise<Result> {
        let result = new Result();
        result.data = await this.categoryRepository.getAll();
        return result;
    }

    async getById(id: number): Promise<Result> {
        let result = new Result();
        result.data = await this.categoryRepository.getById(id);
        if (!result.data) {
            result.message = "Category not found";
        }
        return result;
    }

    async add(category: Category): Promise<Result> {
        let anyError = false;
        let result = new Result();
        if (category.parent) {
            const children = await this.categoryRepository.getChildren(
                category.parent
            );
            children.find((child) => {
                if (child.name === category.name) {
                    result.message = "Category with this name already exists";
                    anyError = true;
                }
            });
        }
        if (!anyError) {
            result.data = await this.categoryRepository.save(category);
        }
        return result;
    }

    async update(category: Category): Promise<Result> {
        let result = new Result();
        const categoryTemp = await this.categoryRepository.getById(category.id);
        if (!categoryTemp) {
            result.message = "Category not found";
        } else {
            await this.categoryRepository.update(category.id, category);
        }
        return result;
    }

    async delete(id: number): Promise<Result> {
        let anyError = false;
        let result = new Result();
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            result.message = "Category not found";
            anyError = true;
        }
        const children = await this.categoryRepository.getChildren(category);
        if (children.length > 0) {
            result.message =
                "There are children categories, you can't delete this category";
            anyError = true;
        }
        const products = await this.productRepository.getByCategory(category);
        if (products.length > 0) {
            result.message =
                "There are products in this category, you can't delete this category";
            anyError = true;
        }
        if (!anyError) {
            await this.categoryRepository.delete(id);
        }
        return result;
    }
}
