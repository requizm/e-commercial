import { createConnection } from "typeorm";
import { Category } from "./entity/Category";
import { Product } from "./entity/Product";
import { User } from "./entity/User";

export async function CreateMemDb() {
    return createConnection({
        name: "test",
        type: "sqlite",
        database: ":memory:",
        entities: [User, Category, Product],
        dropSchema: true,
        synchronize: true,
        logging: false,
    });
}
