import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { Product as ProductEntity } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: ProductDto) {
    const data = instanceToPlain(createProductDto);
    // remove data
    return await this.productsRepository.save(
      plainToInstance(ProductEntity, data),
    );
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const foundProduct = await this.productsRepository.findOne({
      where: { id },
    });
    if (foundProduct) {
      return foundProduct;
    }
    throw new NotFoundException();
  }

  async update(id: number, updateProductDto: ProductDto) {
    const updateProduct = await this.findOne(id);
    updateProduct.title = updateProductDto.title;
    updateProduct.description = updateProductDto.description;
    updateProduct.color = updateProductDto.color;
    updateProduct.mainImage = updateProductDto.mainImage;
    updateProduct.price = updateProductDto.price;
    return await this.productsRepository.save(updateProduct);
  }

  async delete(id: number): Promise<void> {
    const deleteProduct = await this.findOne(id);
    await this.productsRepository.delete(deleteProduct);
  }
}
