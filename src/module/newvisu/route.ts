import { Routes } from '@nestjs/core';
import { NewVisuModule } from './newvisu.module';

export const NewVisuRoutes: Routes = [
  {
    path: 'newvisu',
    module: NewVisuModule,
   
  },
];
