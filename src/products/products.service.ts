import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance, plainToClassFromExist } from 'class-transformer';
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
    return await this.productsRepository.save(
      plainToInstance(ProductEntity, createProductDto),
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
    const dto = {
      id,
      ...updateProductDto,
    };

    return await this.productsRepository.save(
      plainToClassFromExist(updateProduct, dto),
    );
  }

  async delete(id: number): Promise<void> {
    const deleteProduct = await this.findOne(id);
    await this.productsRepository.delete(deleteProduct);
  }
}
