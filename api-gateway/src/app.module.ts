// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ApiGatewayController } from "./controller/api-gateway.controller";
// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'TIMESHEET',
//         transport: Transport.TCP,
//         options: {
//           host: 'localhost',
//           port: 3001,
//         },
//       }
//     ]),
//   ],
//   controllers: [ApiGatewayController],
// })
// export class AppModule {}



// app.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './controller/api-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TIMESHEET',
        transport: Transport.TCP,
        options: {
          host: 'https://monoreposmartax-timesheet.onrender.com/api',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
})
export class AppModule {}





// app.module.ts

// import { Module } from '@nestjs/common';
// import { HttpModule } from '@nestjs/axios';
// import { ApiGatewayController } from './controller/api-gateway.controller';

// @Module({
//   imports: [HttpModule],
//   controllers: [ApiGatewayController],
//   providers: [],
// })
// export class AppModule {}
