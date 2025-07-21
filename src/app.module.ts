
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [], 
  providers: [PrismaService],
  exports: [PrismaService], // Export PrismaService for use in other modules
})
export class AppModule {}
