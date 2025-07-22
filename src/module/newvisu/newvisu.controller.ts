// src/module/newvisu/newvisu.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller() // Root route within module: `/api/newvisu`
export class NewVisuController {
  @Get()
  getDefault() {
    return { message: 'NewVisu works' };
  }

  @Get('test')
  getTest() {
    return { message: 'NewVisu test works' };
  }
}
