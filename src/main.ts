// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyODataServer } from './odata/odata.server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( '/odata', MyODataServer.create());

  await app.listen(3000);
  console.log('NestJS running at http://localhost:3000');
}
bootstrap();
