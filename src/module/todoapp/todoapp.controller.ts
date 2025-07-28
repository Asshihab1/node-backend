import { Controller, Get } from '@nestjs/common';

@Controller()
export class TodoappController {
  @Get()
  getHello() {
    return { message: 'Todoapp works' };
  }
}
