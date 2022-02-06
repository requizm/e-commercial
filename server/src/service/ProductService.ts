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
        const data = await this.productRepository.getAll();
        return new Result({ data: data });
    }

    async getById(id: number): Promise<Result> {
        if (!id) {
            return new Result({ message: "Missing fields" });
        }
        const data = await this.productRepository.getById(id);
        if (!data) {
            return new Result({ message: "Product not found" });
        }
        return new Result({ data: data });
    }

    async add(product: Product): Promise<Result> {
        if (
            !product.name ||
            !product.category ||
            !product.image ||
            !product.price ||
            !product.description ||
            !product.category
        ) {
            return new Result({ message: "Missing fields" });
        }
        const data = await this.productRepository.save(product);
        return new Result({ data: data });
    }

    async update(product: Product): Promise<Result> {
        if (
            !product.name ||
            !product.category ||
            !product.image ||
            !product.price ||
            !product.description ||
            !product.category ||
            !product.id
        ) {
            return new Result({ message: "Missing fields" });
        }
        const productTemp = await this.productRepository.getById(product.id);
        if (!productTemp) {
            return new Result({ message: "Product not found" });
        }
        await this.productRepository.update(product.id, product);
        return new Result({});
    }

    async delete(id: number): Promise<Result> {
        if (!id) {
            return new Result({ message: "Missing fields" });
        }
        const product = await this.productRepository.getById(id);
        if (!product) {
            return new Result({ message: "Product not found" });
        }
        await this.productRepository.delete(id);
        return new Result({});
    }
}
