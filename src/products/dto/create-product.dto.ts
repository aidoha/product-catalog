import { IsNotEmpty } from 'class-validator';
import { Product } from '../products.entity';

export class ProductDto implements Readonly<ProductDto> {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  mainImage: string;
  color: string;

  @IsNotEmpty()
  price: number;
}
