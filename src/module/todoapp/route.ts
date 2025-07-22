import { Routes } from '@nestjs/core';
import { TodoappModule } from './todoapp.module';

export const TodoappRoutes: Routes = [
  {
    path: 'todoapp',
    module: TodoappModule,
  },
];
