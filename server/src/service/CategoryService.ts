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
        const data = await this.categoryRepository.getAll();
        return new Result({ data: data });
    }

    async getById(id: number): Promise<Result> {
        const data = await this.categoryRepository.getById(id);
        if (!data) {
            return new Result({ message: "Category not found" });
        }
        return new Result({ data: data });
    }

    async add(category: Category): Promise<Result> {
        if (category.parent) {
            const children = await this.categoryRepository.getChildren(
                category.parent
            );
            children.find((child) => {
                if (child.name === category.name) {
                    return new Result({
                        message: "Category with this name already exists",
                    });
                }
            });
        }
        const data = await this.categoryRepository.save(category);
        return new Result({ data: data });
    }

    async update(category: Category): Promise<Result> {
        const categoryTemp = await this.categoryRepository.getById(category.id);
        if (!categoryTemp) {
            return new Result({ message: "Category not found" });
        }
        await this.categoryRepository.update(category.id, category);
        return new Result({});
    }

    async delete(id: number): Promise<Result> {
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
