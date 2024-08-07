import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Your API Title')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('yourTag')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors({
        // origin: process.env.PATH_FRONT,
    // origin: ['http://localhost:4200' ],// Allow requests from this origin
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // origin: '', // Allow requests from this origin
    origin:['https://monoreposmartax-fronted.onrender.com','http://localhost:4200'] ,
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
