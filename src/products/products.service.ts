import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 0,
      title: 'iphone 13 pro',
      description: 'new iphone for 500k tenge',
      mainImage: 'some url for image of product',
      color: 'gray',
      price: 500000,
    },
    {
      id: 1,
      title: 'iphone 12 pro',
      description: 'new iphone for 450k tenge',
      mainImage: 'some url for image of product',
      color: 'blue',
      price: 450000,
    },
  ];

  create(product: Product) {
    const newProduct = {
      id: Math.floor(Math.random() * 100) + 1,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((post) => post.id === id);
    if (product) {
      return product;
    }

    throw new HttpException('product not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateProductDto: CreateProductDto) {
    const productIndex = this.products.findIndex((post) => post.id === id);
    if (productIndex > -1) {
      this.products[productIndex] = { id: Number(id), ...updateProductDto };
      return { id: Number(id), ...updateProductDto };
    }
    throw new HttpException('product not found', HttpStatus.NOT_FOUND);
  }

  delete(id: number) {
    const productIndex = this.products.findIndex((post) => post.id === id);
    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
    } else {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
  }
}
