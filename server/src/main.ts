import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global pipes for validation
  app.useGlobalPipes(new ValidationPipe());

  try {
    // await dbService.connect();
    await app.listen(3000); // Make sure this port is correct
  } catch (err) {
    console.error('Failed to start the application:', err);
  }
}

bootstrap();
