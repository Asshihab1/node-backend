import { Module } from '@nestjs/common';
import { ProductController } from '@module/product/product.controller';
import { ProductService } from '@module/product/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
