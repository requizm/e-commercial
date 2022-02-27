import { Connection } from 'typeorm';

import { Test } from '@nestjs/testing';

import { CreateMemDb } from '../db/CreateMemoryDb';
import { Category } from '../db/entity/Category';
import { Product } from '../db/entity/Product';
import { ProductRepository } from '../db/repository/ProductRepository';
import { ProductDto } from '../dto/ProductDto';
import { ProductService } from '../service/ProductService';

describe("Product Service", () => {
    let db: Connection;
    let productService: ProductService;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        db = await CreateMemDb();
        productRepository = db.getCustomRepository(ProductRepository)
        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: "productRepository",
                    useValue: productRepository,
                },
            ],
        }).compile();

        productService = moduleRef.get<ProductService>(ProductService);
    });
    afterEach(() => db.close());

    it("should get all products", async () => {
        const output = [new Product({ name: "test", description: "test", price: 1, image: "test", category: new Category({ name: "test" }) }), new Product({ name: "test2", description: "test2", price: 2, image: "test2", category: new Category({ name: "test2" }) })];

        jest.spyOn(productRepository, "getAll").mockResolvedValueOnce(output);

        const products = await productService.getAll();
        const productsAsArray = products.data as Product[];
        expect(products).toBeDefined();
        expect(productsAsArray.length).toBe(2);
    });

    it("should create a product", async () => {
        const input = new ProductDto({ name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as ProductDto);
        const output = { name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as Product;

        jest.spyOn(productRepository, "save").mockResolvedValueOnce(output);
        const result = await productService.add(input);
        expect(result.data).toBeDefined();
    });

    it("shouldn't create a product with missing input", async () => {
        const input = new ProductDto({ description: "test", price: 1, image: "test", category: { name: "test" } } as ProductDto);

        const result = await productService.add(input);
        expect(result.data).toBeUndefined();
    });


    it("should update a product", async () => {
        const input = { id: 1, name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as Product;

        jest.spyOn(productRepository, "update").mockResolvedValueOnce({ raw: { affectedRows: 1 }, generatedMaps: [{ id: 1 }] });
        jest.spyOn(productRepository, "getById").mockResolvedValueOnce(input);

        const result = await productService.update(input);
        expect(result.message).toBeUndefined();
    });

    it("shouldn't update a product with wrong input", async () => {
        const input = { id: 1, name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as Product;

        jest.spyOn(productRepository, "getById").mockResolvedValueOnce(null);

        const result = await productService.update(input);
        expect(result.message).toBeDefined();
    });

    it("should delete a product", async () => {
        const input = { id: 1, name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as Product;

        jest.spyOn(productRepository, "getById").mockResolvedValueOnce(input);
        jest.spyOn(productRepository, "delete").mockResolvedValueOnce({ raw: { affectedRows: 1 } });

        const result = await productService.delete(input.id);
        expect(result.message).toBeUndefined();
    });

    it("shouldn't delete a product with missing input", async () => {
        const input = { name: "product" } as unknown as Product;

        const result = await productService.delete(input.id);
        expect(result.data).toBeUndefined();
    });

    it("shouldn't delete a product with wrong input", async () => {
        const input = { id: 1, name: "test", description: "test", price: 1, image: "test", category: { name: "test" } } as Product;

        jest.spyOn(productRepository, "getById").mockResolvedValueOnce(null);

        const result = await productService.delete(input.id);
        expect(result.message).toBeDefined();
    });
});
