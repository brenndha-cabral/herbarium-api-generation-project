import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entities';
import { CategoryService } from '../services/category.service';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.findAllCategories();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity> {
    return this.categoryService.findCategoryById(id);
  }

  @Get('/category/:category')
  @HttpCode(HttpStatus.OK)
  findAllByCategory(
    @Param('category') category: string,
  ): Promise<CategoryEntity[]> {
    return this.categoryService.findAllByCategory(category);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryService.create(category);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryService.update(category);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
