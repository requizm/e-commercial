import { Connection, Repository } from "typeorm";
import { CreateMemDb } from "../db/CreateMemoryDb";
import { CategoryDto } from "../dto/CategoryDto";
import { Category } from "../db/entity/Category";
import { CategoryService } from "../service/CategoryService";
import { ProductService } from "../service/ProductService";
import { ProductDto } from "../dto/ProductDto";
import { Product } from "../db/entity/Product";

describe("Product Service", () => {
    let db: Connection;
    let categoryService: CategoryService;

    let productService: ProductService;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        db = await CreateMemDb();
        categoryService = new CategoryService("test");

        productRepository = db.getRepository(Product);
        productService = new ProductService("test");
    });
    afterEach(() => db.close());

    it("should get all products", async () => {
        for (let i = 0; i < 8; i++) {
            const category = new CategoryDto({ name: "parent" + i });
            const categoryResult = await categoryService.add(category);
            const newCategory = categoryResult.data;
            expect(newCategory).toBeDefined();

            const product = new ProductDto({ name: "product" + i, description: "description", price: 1, category: newCategory.id, image: "image" });
            const productResult = await productService.add(product);
            const newProduct = productResult.data;
            expect(newProduct).toBeDefined();
        }

        const products = await categoryService.getAll();
        const productsAsArray = products.data as Category[];
        expect(products).toBeDefined();
        expect(productsAsArray.length).toBe(8);
    });

    it("should create a product", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const product = new ProductDto({ name: "product", description: "description", price: 1, category: newCategory.id, image: "image" });
        const productResult = await productService.add(product);
        const newProduct = productResult.data;
        expect(newProduct).toBeDefined();
    });

    it("shouldn't create a product with missing input", async () => {
        const product = new ProductDto({ });
        const productResult = await productService.add(product);
        const newProduct = productResult.data;
        expect(newProduct).toBeUndefined();
    });


    it("should update a product", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const product = new ProductDto({ name: "product", description: "description", price: 1, category: newCategory.id, image: "image" });
        const productResult = await productService.add(product);
        const newProduct = productResult.data;
        expect(newProduct).toBeDefined();

        const updatedProduct = { id: newProduct.id, name: "updatedProduct", description: "descriptionUpdate", price: 2, category: newCategory.id, image: "imageUpdate" } as Product;
        await productService.update(updatedProduct);
        const updatedProductInDb = await productRepository.findOne(updatedProduct.id);
        expect(updatedProductInDb).toBeDefined();
        expect(updatedProductInDb.name).toBe(updatedProduct.name);
    });

    it("shouldn't update a product with wrong input", async () => {
        const updatedProduct = { id: 3, name: "updatedProduct", description: "descriptionUpdate", price: 2, category: 5, image: "imageUpdate" } as unknown as Product;
        const result = await productService.update(updatedProduct);
        expect(result.message).not.toBe(null);
    });

    it("should delete a product", async () => {
        const category = new CategoryDto({ name: "parent" });
        const categoryResult = await categoryService.add(category);
        const newCategory = categoryResult.data;
        expect(newCategory).toBeDefined();

        const product = new ProductDto({ name: "product", description: "description", price: 1, category: newCategory.id, image: "image" });
        const productResult = await productService.add(product);
        const newProduct = productResult.data;
        expect(newProduct).toBeDefined();

        await productService.delete(newProduct.id);
        const productInDb = await productRepository.findOne(newProduct.id);
        expect(productInDb).toBeUndefined();
    });

    it("shouldn't delete a product with missing input", async () => {
        const product = { name: "product" } as unknown as Category;

        const result = await categoryService.delete(product.id);
        expect(result.message).not.toBe(null);
    });
});
