import { Module } from '@nestjs/common';
import { ShiftvisuController } from '@module/shiftvisu/shiftvisu.controller';
import { ShiftvisuService } from '@module/shiftvisu/shiftvisu.service';

@Module({
  controllers: [ShiftvisuController],
  providers: [ShiftvisuService],
})
export class ShiftvisuModule {}
