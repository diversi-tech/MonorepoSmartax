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
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
})
export class AppModule {}
