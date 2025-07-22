import { Routes } from '@nestjs/core';
import { ShiftVisuModule } from './shiftvisu.module';

export const ShiftVisuRoutes: Routes = [
  {
    path: 'shiftvisu',
    module: ShiftVisuModule,
  },
];
