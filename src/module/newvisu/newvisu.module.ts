import { Module } from '@nestjs/common';
import { NewVisuController } from './newvisu.controller';
import { NewVisuService } from './newvisu.service';

@Module({
  controllers: [NewVisuController],
  providers: [NewVisuService],
})
export class NewVisuModule {}
