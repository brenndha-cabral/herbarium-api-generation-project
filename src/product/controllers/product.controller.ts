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
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../entities/product.entities';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAllProducts();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productService.findProductById(id);
  }

  @Get('/product/:product')
  @HttpCode(HttpStatus.OK)
  findAllByProduct(
    @Param('product') product: string,
  ): Promise<ProductEntity[]> {
    return this.productService.findAllByProduct(product);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: ProductEntity): Promise<ProductEntity> {
    return this.productService.create(product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: ProductEntity): Promise<ProductEntity> {
    return this.productService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
