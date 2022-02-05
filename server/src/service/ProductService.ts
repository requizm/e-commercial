import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/db/entity/Product";
import { ProductRepository } from "src/db/repository/ProductRepository";
import { Result } from "src/dto/Result";
import { getConnection } from "typeorm";

@Injectable()
export class ProductService {
    productRepository: ProductRepository;
    constructor(@Inject("connectionName") private connectionName: string) {
        const connection = getConnection(this.connectionName);
        this.productRepository = connection.getCustomRepository(
            ProductRepository
        );
    }

    async getAll(): Promise<Result> {
        let result = new Result();
        result.data = await this.productRepository.getAll();
        return result;
    }

    async getById(id: number): Promise<Result> {
        let result = new Result();
        result.data = await this.productRepository.getById(id);
        if (!result.data) {
            result.message = "Product not found";
        }
        return result;
    }

    async add(product: Product): Promise<Result> {
        let result = new Result();
        result.data = await this.productRepository.save(product);
        return result;
    }

    async update(product: Product): Promise<Result> {
        let result = new Result();
        const productTemp = await this.productRepository.getById(product.id);
        if (!productTemp) {
            result.message = "Product not found";
        } else {
            await this.productRepository.update(product.id, product);
        }
        return result;
    }

    async delete(id: number): Promise<Result> {
        let result = new Result();
        const product = await this.productRepository.getById(id);
        if (!product) {
            result.message = "Product not found";
        } else {
            await this.productRepository.delete(id);
        }
        return result;
    }
}
