import { ShiftVisuRoutes } from '../module/shiftvisu/route';
import { NewVisuRoutes } from '../module/newvisu/route';

import { Routes } from '@nestjs/core';

export const apiRoutes: Routes = [
  ...ShiftVisuRoutes,
  ...NewVisuRoutes,];
