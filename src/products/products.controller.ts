import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(Number(id));
  }
}
