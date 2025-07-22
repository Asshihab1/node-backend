import { TodoappRoutes } from '../module/todoapp/route';
import { ShiftVisuRoutes } from '../module/shiftvisu/route';
import { NewVisuRoutes } from '../module/newvisu/route';

import { Routes } from '@nestjs/core';

export const apiRoutes: Routes = [
  ...TodoappRoutes,
  ...ShiftVisuRoutes,
  ...NewVisuRoutes,];
