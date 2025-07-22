import { Module } from '@nestjs/common';
import { ShiftVisuController } from './shiftvisu.controller';
import { ShiftVisuService } from './shiftvisu.service';

@Module({
  controllers: [ShiftVisuController],
  providers: [ShiftVisuService],
})
export class ShiftVisuModule {}
