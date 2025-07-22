// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { MyODataServer } from './odata/odata.server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( '/odata', MyODataServer.create());

  await app.listen(3000);
  console.log('NestJS + OData running at http://localhost:3000/odata/Products');
}
bootstrap();
