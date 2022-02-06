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
import { Category } from "../db/entity/Category";
import { CategoryDto } from "../dto/CategoryDto";
import { CategoryService } from "../service/CategoryService";

@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get("getall")
    async getAll(@Req() request: Request, @Res() res: Response) {
        const result = await this.categoryService.getAll();
        res.status(HttpStatus.OK).json(result);
    }

    @Get("get/:id")
    async get(@Req() request: Request, @Res() res: Response, @Param() params) {
        const result = await this.categoryService.getById(params.id);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }

    @Post("add")
    async add(@Req() request: Request, @Res() res: Response) {
        const category = JSON.parse(
            JSON.stringify(request.body),
        ) as CategoryDto;
        const result = await this.categoryService.add(category);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }

    @Put("update")
    async update(@Req() request: Request, @Res() res: Response) {
        const category = JSON.parse(JSON.stringify(request.body)) as Category;
        const result = await this.categoryService.update(category);
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
        const result = await this.categoryService.delete(params.id);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }
}
