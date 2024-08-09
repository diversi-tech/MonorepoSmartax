import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
        // origin: process.env.PATH_FRONT,
    // origin: '', // Allow requests from this origin
    origin:['https://monoreposmartax-o1oz.onrender.com','http://localhost:4200'] ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
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
