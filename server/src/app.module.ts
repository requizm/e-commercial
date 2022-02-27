import { getConnectionManager } from 'typeorm/globals';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controller/AuthController';
import { CategoryController } from './controller/CategoryController';
import { ProductController } from './controller/ProductController';
import { CategoryRepository } from './db/repository/CategoryRepository';
import { ProductRepository } from './db/repository/ProductRepository';
import { UserRepository } from './db/repository/UserRepository';
import { AuthService } from './service/AuthService';
import { CategoryService } from './service/CategoryService';
import { ProductService } from './service/ProductService';

@Module({
    imports: [],
    controllers: [
        AppController,
        AuthController,
        CategoryController,
        ProductController,
    ],
    providers: [
        AppService,
        AuthService,
        CategoryService,
        ProductService,
    ],
})
export class AppModule {}
