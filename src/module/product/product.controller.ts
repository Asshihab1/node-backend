import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductController {
  @Get()
  getHello() {
    return { message: 'Product works' };
  }
}
