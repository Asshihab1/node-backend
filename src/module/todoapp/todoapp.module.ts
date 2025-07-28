import { Module } from '@nestjs/common';
import { TodoappController } from '@module/todoapp/todoapp.controller';
import { TodoappService } from '@module/todoapp/todoapp.service';

@Module({
  controllers: [TodoappController],
  providers: [TodoappService],
})
export class TodoappModule {}
