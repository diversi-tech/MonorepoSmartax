// import { Controller, Post, Body, Param, Inject, Get } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';

// @Controller('api')
// export class ApiGatewayController {
//   constructor(
//     @Inject('TIMESHEET') private readonly WorkLodService: ClientProxy,

//   ) {}

//   @Get(':service/:cmd')
//   async handleRequestGet(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Body() data: any
//   ) {
//     let client: ClientProxy;
    
//     switch (service) {
//       case 'worklogs':
//         client = this.WorkLodService;
//         break;
//       default:
//         throw new Error('Unknown service');
//     }

//     return client.send({ cmd }, data).toPromise();
//   }

//   @Post(':service/:cmd')
//   async handleRequestPost(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Body() data: any
//   ) {
//     let client: ClientProxy;
    
//     switch (service) {
//       case 'worklogs':
//         client = this.WorkLodService;
//         break;
//       default:
//         throw new Error('Unknown service');
//     }

//     return client.send({ cmd }, data).toPromise();
//   }
// }
// api-gateway.controller.ts
import { Controller, Post, Body, Param, Inject, Get } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Controller('api')
export class ApiGatewayController {
  constructor(
    @Inject('TIMESHEET') private readonly workLogService: ClientProxy,
  ) {}

  @Get(':service/:cmd')
  async handleRequestGet(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Body() data: any
  ) {
    let client: ClientProxy;
    
    switch (service) {
      case 'worklogs':
        client = this.workLogService;
        break;
      default:
        throw new Error('Unknown service');
    }

    return client.send({ cmd }, data).toPromise();
  }

  @Post(':service/:cmd')
  async handleRequestPost(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Body() data: any
  ) {
    let client: ClientProxy;
    
    switch (service) {
      case 'worklogs':
        client = this.workLogService;
        break;
      default:
        throw new Error('Unknown service');
    }

    return client.send({ cmd }, data).toPromise();
  }
}
























// import { Controller, Post, Put, Param, Body, Get, Query, Res, HttpStatus } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { Response } from 'express';
// import { firstValueFrom } from 'rxjs';

// @Controller('api')
// export class ApiGatewayController {
//   constructor(private readonly httpService: HttpService) {}

//   @Post(':service/:cmd')
//   async handlePostRequest(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Body() data: any,
//     @Res() res: Response
//   ) {
//     const url = `http://localhost:3001/${service}/${cmd}`;
//     try {
//       const response = await firstValueFrom(this.httpService.post(url, data));
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error(`POST request failed: ${error.message}`);
//       res.status(error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response?.data || { error: 'Internal Server Error' });
//     }
//   }

//   @Put(':service/:cmd/:id')
//   async handlePutRequest(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Param('id') id: string,
//     @Body() data: any,
//     @Res() res: Response
//   ) {
//     const url = `http://localhost:3001/${service}/${cmd}/${id}`;
//     try {
//       const response = await firstValueFrom(this.httpService.put(url, data));
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error(`PUT request failed: ${error.message}`);
//       res.status(error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response?.data || { error: 'Internal Server Error' });
//     }
//   }

//   @Get(':service/:cmd')
//   async handleGetRequest(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Query() query: any,
//     @Res() res: Response
//   ) {
//     const url = `http://localhost:3001/${service}/${cmd}`;
//     console.log(`Constructed URL: ${url}`);

//     try {
//       const response = await firstValueFrom(this.httpService.get(url, { params: query }));
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error(`GET request failed: ${error.message}`);
//       res.status(error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response?.data || { error: 'Internal Server Error' });
//     }
//   }

//   @Get(':service/:cmd/:id')
//   async handleGetByIdRequest(
//     @Param('service') service: string,
//     @Param('cmd') cmd: string,
//     @Param('id') id: string,
//     @Res() res: Response
//   ) {
//     const url = `http://localhost:3001/${service}/${cmd}/${id}`;
//     try {
//       const response = await firstValueFrom(this.httpService.get(url));
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error(`GET by ID request failed: ${error.message}`);
//       res.status(error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response?.data || { error: 'Internal Server Error' });
//     }
//   }
// }
