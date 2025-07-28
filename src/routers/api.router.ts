import { TodoappRoutes } from '@module/todoapp/route';
import { Routes } from '@nestjs/core';
export const apiRoutes: Routes = [
  ...TodoappRoutes,];
