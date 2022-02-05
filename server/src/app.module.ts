import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./controller/AuthController";
import { CategoryController } from "./controller/CategoryController";
import { ProductController } from "./controller/ProductController";
import { AuthService } from "./service/AuthService";
import { CategoryService } from "./service/CategoryService";
import { ProductService } from "./service/ProductService";

@Module({
    imports: [],
    controllers: [
        AppController,
        AuthController,
        CategoryController,
        ProductController,
    ],
    providers: [AppService, AuthService, CategoryService, ProductService],
})
export class AppModule {}
