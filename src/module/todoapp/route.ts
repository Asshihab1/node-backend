import { Routes } from '@nestjs/core';
import { TodoappModule } from '@module/todoapp/todoapp.module';

export const TodoappRoutes: Routes = [
  {
    path: 'todoapp',
    module: TodoappModule,
  },
];
