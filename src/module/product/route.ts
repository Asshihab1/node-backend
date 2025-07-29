import { Routes } from '@nestjs/core';
import { ProductModule } from '@module/product/product.module';

export const ProductRoutes: Routes = [
  {
    path: 'product',
    module: ProductModule,
  },
];
