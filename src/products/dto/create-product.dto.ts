import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  mainImage: string;
  color: string;

  @IsNotEmpty()
  price: number;
}
