import { Routes } from '@nestjs/core';
import { ShiftvisuModule } from '@module/shiftvisu/shiftvisu.module';

export const ShiftvisuRoutes: Routes = [
  {
    path: 'shiftvisu',
    module: ShiftvisuModule,
  },
];
