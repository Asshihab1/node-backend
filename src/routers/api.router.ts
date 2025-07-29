import { ProductRoutes } from '@module/product/route';
import { Routes } from '@nestjs/core';
export const apiRoutes: Routes = [...ProductRoutes];
