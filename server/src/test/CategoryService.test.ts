import { Connection } from 'typeorm';

import { Test } from '@nestjs/testing';

import { CreateMemDb } from '../db/CreateMemoryDb';
import { Category } from '../db/entity/Category';
import { Product } from '../db/entity/Product';
import { CategoryRepository } from '../db/repository/CategoryRepository';
import { ProductRepository } from '../db/repository/ProductRepository';
import { CategoryDto } from '../dto/CategoryDto';
import { CategoryService } from '../service/CategoryService';
import { ProductService } from '../service/ProductService';

describe("Category Service", () => {
    let db: Connection;

    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        db = await CreateMemDb();
        productRepository = db.getCustomRepository(ProductRepository)
        categoryRepository = db.getCustomRepository(CategoryRepository)
        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: "productRepository",
                    useValue: productRepository,
                },
                CategoryService,
                {
                    provide: "categoryRepository",
                    useValue: categoryRepository,
                },
                {
                    provide: "productRepository",
                    useValue: productRepository,
                },
            ],
        }).compile();

        categoryService = moduleRef.get<CategoryService>(CategoryService);
    });
    afterEach(() => db.close());

    it("should get all categories", async () => {
        const output = [new Category({ name: "test" }), new Category({ name: "test2" })];

        jest.spyOn(categoryRepository, "getAll").mockResolvedValueOnce(output);

        const categories = await categoryService.getAll();
        const catogeriesAsArray = categories.data as Category[];
        expect(categories).toBeDefined();
        expect(catogeriesAsArray.length).toBe(2);
    });

    it("should create a parent and child category ", async () => {
        const parent = { id: 1, name: "test" } as Category;
        const input = new CategoryDto({ name: "test2", parent: parent.id } as unknown as CategoryDto);
        const output = { name: "test2", parent: parent } as Category;

        jest.spyOn(categoryRepository, "getChildren").mockResolvedValueOnce([]);
        jest.spyOn(categoryRepository, "save").mockResolvedValueOnce(output);

        const result = await categoryService.add(input);
        expect(result.data).toBeDefined();
    });

    it("shouldn't create a category with missing input", async () => {
        const category = new CategoryDto({});

        const result = await categoryService.add(category);
        expect(result.data).toBeUndefined();
    });

    it("shouldn't create a category with wrong input and null parent ", async () => {
        const root = { id: 1, name: "category" } as Category;
        const input = new CategoryDto({ name: "category" } as unknown as CategoryDto);
        jest.spyOn(categoryRepository, "getRootChildren").mockResolvedValueOnce([root]);

        const result = await categoryService.add(input);
        expect(result.data).toBeUndefined();
    });

    it("shouldn't create a category with wrong input and parent", async () => {
        const root = { id: 1, name: "category" } as Category;
        const rootChildren = { id: 2, name: "root_children", parent: root } as Category;
        const input = new CategoryDto({ name: "root_children", parent: root.id } as unknown as CategoryDto);

        jest.spyOn(categoryRepository, "getChildren").mockResolvedValueOnce([rootChildren]);

        const result = await categoryService.add(input);
        expect(result.data).toBeUndefined();
    });

    it("should update a category ", async () => {
        const parent = { id: 1, name: "parent" } as Category;
        const child = { id: 2, name: "child" } as Category;
        const updatedChild = { id: child.id, name: "updated", parent: parent.id } as unknown as Category;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(child);
        jest.spyOn(categoryRepository, "getRootChildren").mockResolvedValueOnce([parent]);
        jest.spyOn(categoryRepository, "update").mockResolvedValueOnce({ raw: { affectedRows: 1 }, generatedMaps: [{ id: 1 }] });

        const result = await categoryService.update(updatedChild);
        expect(result.message).toBeUndefined();
    });

    it("shouldn't update a category with wrong input", async () => {
        const root = { id: 1, name: "parent" } as Category;
        const rootChildren = { id: 2, name: "root_children", parent: root } as Category;

        const child = { id: 3, name: "child" } as Category;
        const updatedChild = { id: child.id, name: "root_children", parent: root.id } as unknown as Category;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(child);
        jest.spyOn(categoryRepository, "getChildren").mockResolvedValueOnce([rootChildren]);

        const result = await categoryService.update(updatedChild);
        expect(result.message).toBeDefined();
    });

    it("shouldn't update a category with missing input", async () => {
        const input = { name: "parent" } as Category;

        const result = await categoryService.update(input);
        expect(result.message).toBeDefined();
    });

    it("shouldn't update a category with wrong parent", async () => {
        const root = { id: 1, name: "parent" } as Category;
        const updatedParent = { id: root.id, parent: root.id } as unknown as Category;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(root);

        const result = await categoryService.update(updatedParent);
        expect(result.message).toBeDefined();
    });

    it("should delete a category ", async () => {
        const input = { id: 1, name: "test" } as Category;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(input);
        jest.spyOn(categoryRepository, "getChildren").mockResolvedValueOnce([]);
        jest.spyOn(productRepository, "getByCategory").mockResolvedValueOnce([]);
        jest.spyOn(categoryRepository, "delete").mockResolvedValueOnce({ raw: { affectedRows: 1 } });

        const result = await categoryService.delete(input.id);
        expect(result.message).toBeUndefined();
    });

    it("shouldn't delete a category with have child", async () => {
        const parent = { id: 1, name: "parent" } as Category;
        const child = { id: 2, name: "child", parent: parent } as Category;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(parent);
        jest.spyOn(categoryRepository, "getChildren").mockResolvedValueOnce([child]);

        const result = await categoryService.delete(parent.id);
        expect(result.message).toBeDefined();
    });

    it("shouldn't delete a category with have product", async () => {
        const parent = { id: 1, name: "parent" } as Category;
        const product = { id: 2, name: "product", category: parent } as Product;

        jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce(parent);
        jest.spyOn(productRepository, "getByCategory").mockResolvedValueOnce([product]);

        const result = await categoryService.delete(parent.id);
        expect(result.message).toBeDefined();
    });

    it("shouldn't delete a category with missing input", async () => {
        const category = { name: "category" } as unknown as Category;

        const result = await categoryService.delete(category.id);
        expect(result.message).toBeDefined();
    });
});
