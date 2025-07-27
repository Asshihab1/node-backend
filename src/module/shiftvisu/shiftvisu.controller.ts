import { Controller, Get } from '@nestjs/common';

@Controller()
export class ShiftvisuController {
  @Get()
  getHello() {
    return { message: 'Shiftvisu works' };
  }
}
