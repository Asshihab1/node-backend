import { ShiftvisuRoutes } from '@module/shiftvisu/route';

import { Routes } from '@nestjs/core';

export const apiRoutes: Routes = [
  ...ShiftvisuRoutes,
  ];
