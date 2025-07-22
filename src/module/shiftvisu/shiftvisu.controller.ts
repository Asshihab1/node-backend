import { Controller, Get } from '@nestjs/common';

@Controller()
export class ShiftVisuController {
  @Get()
  getHello() {
    return { message: 'ShiftVisu works' };
  }

  @Get('/test')
  getTest() {
    return { message: 'ShiftVisu test works' };
  }
}
