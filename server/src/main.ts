import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DbService } from './services/db.service';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketIo from 'socket.io';
import cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const dbService = app.get(DbService);

  // Enable CORS
  app.enableCors({
    // origin: '', // Allow requests from this origin
    origin:['https://monoreposmartax-fronted.onrender.com','http://localhost:4200'] ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
  });

  // Global pipes for validation
  app.useGlobalPipes(new ValidationPipe());

    try {
    // await dbService.connect();
    await app.listen(3000); // Make sure this port is correct
    console.log('Application is running on: http://localhost:3000');
  } catch (err) {
    console.error('Failed to start the application:', err);
  }
}

bootstrap();
