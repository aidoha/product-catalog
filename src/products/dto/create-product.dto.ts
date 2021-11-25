import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  mainImage: string;
  color: string;

  @IsNotEmpty()
  price: number;
}
