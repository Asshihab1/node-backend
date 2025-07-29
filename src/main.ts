// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyODataServer } from './odata/odata.server';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( '/odata', MyODataServer.create());


// post data


const postData = async () => {

 axios.post('http://localhost:3000/odata/Todos', {
  title: 'New Todo',
  description: 'This is a new todo item',
  started: false,
  completed: false
  })
  .then(response => {
    console.log('Product created:', response.data);
  })
  .catch(error => {
    console.log("error ")
    console.error('Error creating product:', error.response ? error.response.data : error.message);
  });

}

setInterval(async () => {
  // await postData();
}, 1);


  await app.listen(3000);
  console.log('NestJS running at http://localhost:3000');
}
bootstrap();
