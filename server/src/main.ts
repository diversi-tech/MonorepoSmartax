// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // אפשר בקשות ממקור זה
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global pipes for validation
  app.useGlobalPipes(new ValidationPipe());

  // איפוס אפליקציה
  try {
    await app.listen(3000); // וודא שהפורט הנכון
    console.log('Application is running on: http://localhost:3000');
  } catch (err) {
    console.error('Failed to start the application:', err);
  }
}

bootstrap();

