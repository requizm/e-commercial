import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Category } from 'src/db/entity/Category';
import { CategoryService } from 'src/service/CategoryService';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('getall')
  async getAll(@Req() request: Request, @Res() res: Response) {
    const categories = await this.categoryService.getAll();
    res.status(HttpStatus.OK).json(categories);
  }

  @Get('get/:id')
  async get(@Req() request: Request, @Res() res: Response, @Param() params) {
    const category = await this.categoryService.getById(params.id);
    res.status(HttpStatus.OK).json(category);
  }

  @Post('add')
  async add(@Req() request: Request, @Res() res: Response) {
    const category = JSON.parse(JSON.stringify(request.body)) as Category;
    const result = await this.categoryService.add(category);
    res
      .status(result ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE)
      .json(result ? result : 'Category already exists');
  }

  @Put('update')
  async update(@Req() request: Request, @Res() res: Response) {
    const category = JSON.parse(JSON.stringify(request.body)) as Category;
    const result = await this.categoryService.update(category);
    res
      .status(result === '' ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE)
      .send(result);
  }

  @Post('delete/:id')
  async delete(@Req() request: Request, @Res() res: Response, @Param() params) {
    const result = await this.categoryService.delete(params.id);
    res
      .status(result === '' ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE)
      .send(result);
  }
}
