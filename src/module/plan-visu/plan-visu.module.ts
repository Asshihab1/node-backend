import { Module } from '@nestjs/common';
import { plan-visuController } from './plan-visu.controller';
import { plan-visuService } from './plan-visu.service';

@Module({
  controllers: [plan-visuController],
  providers: [plan-visuService],
})
export class plan-visuModule {}
