// import { NestFactory } from '@nestjs/core';
// import { TimesheetModule } from './app.module';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(TimesheetModule, {
//     transport: Transport.TCP,
//     options: {
//       host: 'localhost',
//       port: 3001,
//     },
//   });
//   await app.listen();
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { TimesheetModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TimesheetModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');  // Listen on all network interfaces
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
