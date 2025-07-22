import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Controller()
export class ShiftVisuController {
  @Get()
 async getHello() {
    const prisma = new PrismaService();
  let response= await prisma.product.findMany({});
    return { message: 'ShiftVisu works' , data: response };
  }

  @Get('/test')
  getTest() {
    return { message: 'ShiftVisu test works' };
  }
}
