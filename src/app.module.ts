import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductsModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
