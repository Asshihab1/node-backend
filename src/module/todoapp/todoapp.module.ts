import { Module } from '@nestjs/common';
import { TodoappController } from './todoapp.controller';
import { TodoappService } from './todoapp.service';

@Module({
  controllers: [TodoappController],
  providers: [TodoappService],
})
export class TodoappModule {}
