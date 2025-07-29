
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PrismaService } from './prisma/prisma.service';
import { apiRoutes } from '../src/routers/api.router';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: apiRoutes,
      },
    ]),
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
