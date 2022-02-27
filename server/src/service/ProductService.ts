import { getConnectionManager } from 'typeorm';

import { Inject, Injectable, Optional } from '@nestjs/common';

import { Product } from '../db/entity/Product';
import { ProductRepository } from '../db/repository/ProductRepository';
import { ProductDto } from '../dto/ProductDto';
import { Result } from '../dto/Result';

@Injectable()
export class ProductService {
    constructor(@Optional() @Inject("productRepository") private productRepository: ProductRepository) {
        this.productRepository = productRepository;
        if (!this.productRepository) {
            this.productRepository = getConnectionManager().get("default").getCustomRepository(ProductRepository);
        }
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

    async add(productDto: ProductDto): Promise<Result> {
        const product = productDto.toProduct() as Product;
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
