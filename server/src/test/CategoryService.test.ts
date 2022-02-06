import { Connection, Repository } from "typeorm";
import { CreateMemDb } from "../db/CreateMemoryDb";
import { CategoryDto } from "../dto/CategoryDto";
import { Category } from "../db/entity/Category";
import { CategoryService } from "../service/CategoryService";
import { ProductService } from "../service/ProductService";
import { ProductDto } from "../dto/ProductDto";

describe("Category Service", () => {
    let db: Connection;
    let categoryService: CategoryService;
    let categoryRepository: Repository<Category>;

    let productService: ProductService;

    beforeEach(async () => {
        db = await CreateMemDb();
        categoryRepository = db.getRepository(Category);
        categoryService = new CategoryService("test");

        productService = new ProductService("test");
    });
    afterEach(() => db.close());

    it("should get all categories", async () => {
        for (let i = 0; i < 10; i++) {
            const category = new CategoryDto({ name: "category" + i });
            const categoryResult = await categoryService.add(category);
            const newCategory = categoryResult.data;
            expect(newCategory).toBeDefined();
        }

        const categories = await categoryService.getAll();
        const catogeriesAsArray = categories.data as Category[];
        expect(categories).toBeDefined();
        expect(catogeriesAsArray.length).toBe(10);
    });

    it("should create a parent and child category ", async () => {
        const parent = new CategoryDto({ name: "parent" });
        const parentResult = await categoryService.add(parent);
        const newParent = parentResult.data;
        expect(newParent).toBeDefined();

        const newParentInDb = await categoryRepository.findOne(newParent.id);
        expect(newParentInDb.name).toBe(parent.name);


        const child = new CategoryDto({ name: "child", parent: newParent.id });
        const childResult = await categoryService.add(child);
        const newChild = childResult.data;
        expect(newChild).toBeDefined();

        const newChildInDb = await categoryRepository.findOne({
            where: { id: newChild.id },
            relations: ["parent"],
        });
        expect(newChildInDb.name).toBe(child.name);
        expect(newChildInDb.parent.id).toBe(newParent.id);
    });

    it("shouldn't create a category with missing input", async () => {
        const category = new CategoryDto({});
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeUndefined();
    });

    it("shouldn't create a category with wrong input and null parent ", async () => {
        const category = new CategoryDto({ name: "category" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const category2 = new CategoryDto({ name: "category" });
        const category2Result = await categoryService.add(category2);
        const newCategory2 = category2Result.data;
        expect(newCategory2).toBeUndefined();
    });

    it("shouldn't create a category with wrong input and parent", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const child1 = new CategoryDto({ name: "child", parent: newCategory.id });
        const child1Result = await categoryService.add(child1);
        const newChild1 = child1Result.data;
        expect(newChild1).toBeDefined();

        const child2 = new CategoryDto({ name: "child", parent: newCategory.id });
        const child2Result = await categoryService.add(child2);
        const newChild2 = child2Result.data;
        expect(newChild2).toBeUndefined();
    });

    it("should update a category ", async () => {
        const parent = new CategoryDto({ name: "parent" });
        const parentResult = await categoryService.add(parent);
        const newParent = parentResult.data;
        expect(newParent).toBeDefined();

        const child = new CategoryDto({ name: "child" });
        const childResult = await categoryService.add(child);
        const newChild = childResult.data;
        expect(newChild).toBeDefined();

        const updatedChild = { id: newChild.id, name: "updated", parent: newParent.id } as unknown as Category;
        await categoryService.update(updatedChild);

        const updatedChildInDb = await categoryRepository.findOne({
            where: { id: updatedChild.id },
            relations: ["parent"],
        });
        expect(updatedChildInDb).toBeDefined();
        expect(updatedChildInDb.name).toBe(updatedChild.name);
        expect(updatedChildInDb.parent.id).toBe(updatedChild.parent);
    });

    it("shouldn't update a category with wrong input", async () => {
        const parent = new CategoryDto({ name: "parent" });
        const parentResult = await categoryService.add(parent);
        const newParent = parentResult.data;
        expect(newParent).toBeDefined();

        const child = new CategoryDto({ name: "child" });
        const childResult = await categoryService.add(child);
        const newChild = childResult.data;
        expect(newChild).toBeDefined();

        const updatedChild = { id: newChild.id, name: "parent" } as unknown as Category;
        await categoryService.update(updatedChild);

        const updatedChildInDb = await categoryRepository.findOne({
            where: { id: updatedChild.id },
            relations: ["parent"],
        });
        expect(updatedChildInDb.name).toBe(child.name);
    });

    it("shouldn't update a category with missing input", async () => {
        const parent = new CategoryDto({ name: "parent" });
        const parentResult = await categoryService.add(parent);
        const newParent = parentResult.data;
        expect(newParent).toBeDefined();

        const child = new CategoryDto({ name: "child" });
        const childResult = await categoryService.add(child);
        const newChild = childResult.data;
        expect(newChild).toBeDefined();

        const updatedChild = { id: newChild.id } as unknown as Category;
        const result = await categoryService.update(updatedChild);
        expect(result.message).not.toBe(null);
    });

    it("should delete a category ", async () => {
        const category = new CategoryDto({ name: "category" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        await categoryService.delete(newCategory.id);

        const categoryInDb = await categoryRepository.findOne(newCategory.id);
        expect(categoryInDb).toBeUndefined();
    });

    it("shouldn't delete a category with have child", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const child1 = new CategoryDto({ name: "child", parent: newCategory.id });
        const child1Result = await categoryService.add(child1);
        const newChild1 = child1Result.data;
        expect(newChild1).toBeDefined();

        await categoryService.delete(newCategory.id);
        const categoryInDb = await categoryRepository.findOne(newCategory.id);
        expect(categoryInDb).toBeDefined();
    });

    it("shouldn't delete a category with have product", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const product = new ProductDto({ name: "product", description: "description", price: 1, category: newCategory.id, image: "image" });
        const productResult = await productService.add(product);
        const newProduct = productResult.data;
        expect(newProduct).toBeDefined();

        await categoryService.delete(newCategory.id);
        const categoryInDb = await categoryRepository.findOne(newCategory.id);
        expect(categoryInDb).toBeDefined();
    });

    it("shouldn't delete a category with missing input", async () => {
        const category = { name: "category" } as unknown as Category;

        const result = await categoryService.delete(category.id);
        expect(result.message).not.toBe(null);
    });
});
