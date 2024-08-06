// import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { TimesheetModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(TimesheetModule);

//   app.enableCors({
//     origin: 'http://localhost:4200', // כתובת הלקוח שלך (ה-Front-end)
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });

//   const config = new DocumentBuilder()
//     .setTitle('Timesheet Service')
//     .setDescription('Timesheet service API description')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(3001);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { TimesheetModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TimesheetModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();
