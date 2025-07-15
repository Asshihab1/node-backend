import { Module } from '@nestjs/common';
import { shiftvisuController } from './shiftvisu.controller';
import { shiftvisuService } from './shiftvisu.service';

@Module({
  controllers: [shiftvisuController],
  providers: [shiftvisuService],
})
export class shiftvisuModule {}
