import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Product } from "src/db/entity/Product";
import { ProductService } from "src/service/ProductService";

@Controller("product")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get("getall")
    async getAll(@Req() request: Request, @Res() res: Response) {
        const products = await this.productService.getAll();
        return res.status(HttpStatus.OK).json(products);
    }

    @Get("get/:id")
    async get(@Req() request: Request, @Res() res: Response, @Param() params) {
        const product = await this.productService.getById(params.id);
        res.status(HttpStatus.OK).json(product);
    }

    @Post("add")
    async add(@Req() request: Request, @Res() res: Response) {
        const product = JSON.parse(JSON.stringify(request.body)) as Product;
        const result = await this.productService.add(product);
        res.status(result ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE).json(
            result ? result : "Product already exists"
        );
    }

    @Put("update")
    async update(@Req() request: Request, @Res() res: Response) {
        const product = JSON.parse(JSON.stringify(request.body)) as Product;
        const result = await this.productService.update(product);
        res.status(
            result === "" ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE
        ).send(result);
    }

    @Post("delete/:id")
    async delete(
        @Req() request: Request,
        @Res() res: Response,
        @Param() params
    ) {
        const result = await this.productService.delete(params.id);
        res.status(
            result === "" ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE
        ).send(result);
    }
}
