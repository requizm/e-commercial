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
import { ProductDto } from "src/dto/ProductDto";
import { ProductService } from "src/service/ProductService";

@Controller("product")
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get("getall")
    async getAll(@Req() request: Request, @Res() res: Response) {
        const result = await this.productService.getAll();
        return res.status(HttpStatus.OK).json(result);
    }

    @Get("get/:id")
    async get(@Req() request: Request, @Res() res: Response, @Param() params) {
        const result = await this.productService.getById(params.id);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }

    @Post("add")
    async add(@Req() request: Request, @Res() res: Response) {
        const product = JSON.parse(JSON.stringify(request.body)) as ProductDto;
        const result = await this.productService.add(product);
        res.status(HttpStatus.OK).json(result);
    }

    @Put("update")
    async update(@Req() request: Request, @Res() res: Response) {
        const product = JSON.parse(JSON.stringify(request.body)) as Product;
        const result = await this.productService.update(product);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }

    @Post("delete/:id")
    async delete(
        @Req() request: Request,
        @Res() res: Response,
        @Param() params
    ) {
        const result = await this.productService.delete(params.id);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }
}
