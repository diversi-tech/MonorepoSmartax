import {
  Controller,
  Post,
  Body,
  Param,
  Inject,
  Get,
  Put,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';

@Controller('api')
export class ApiGatewayController {
  constructor(
    @Inject('TIMESHEET') private readonly workLogService: ClientProxy
  ) // @Inject('OTHER_SERVICE') private readonly otherService: ClientProxy,
  {}

  private getClientProxy(service: string): ClientProxy {
    switch (service) {
      case 'worklogs':
        return this.workLogService;
      default:
        throw new Error('Unknown service');
    }
  }

  @Get(':service/:cmd/:id?')
  async handleRequestGet(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Param('id') id?: string
  ) {
    const client = this.getClientProxy(service);
    const requestPayload = id ? { employeeId: id } : {};
    return client.send({ cmd }, requestPayload).toPromise();
  }

  @Post(':service/:cmd')
  async handleRequestPost(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Body() data: any
  ) {
    const client = this.getClientProxy(service);
    return client.send({ cmd }, data).toPromise();
  }


  @Get(':service/export/:month/:year')
  async exportWorkLogs(
    @Param('service') service: string,
    @Param('month') month: number,
    @Param('year') year: number,
    @Res() res: Response
  ): Promise<void> {
    const client = this.getClientProxy(service);
    console.log(
      `Received request to export work logs for month: ${month}, year: ${year}`
    );
    try {
      const result = await client
        .send<{ type: string; data: number[] }>(
          { cmd: 'export' },
          { month, year }
        )
        .toPromise();
      if (!result || !result.data) {
        throw new Error('Buffer is undefined');
      }
      const buffer = Buffer.from(result.data);
      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      console.error('Error exporting work logs:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error exporting work logs');
    }
  }

  @Get(':service/export/:employeeId/:month/:year')
  async exportWorkLogsForEmployee(
    @Param('service') service: string,
    @Param('employeeId') employeeId: string,
    @Param('month') month: number,
    @Param('year') year: number,
    @Res() res: Response
  ): Promise<void> {
    const client = this.getClientProxy(service);
    console.log(
      `Received request to export work logs for employeeId: ${employeeId}, month: ${month}, year: ${year}`
    );
    try {
      const result = await client
        .send<{ type: string; data: number[] }>(
          { cmd: 'exportForEmployee' },
          { employeeId, month, year }
        )
        .toPromise();
      if (!result || !result.data) {
        throw new Error('Buffer is undefined');
      }
      const buffer = Buffer.from(result.data);
      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      console.error('Error exporting work logs for employee:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error exporting work logs for employee');
    }
  }
  @Put(':service/:cmd/:id?')
  async handleRequestPut(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Param('id') id?: string,
    @Body() data?: any
  ) {
    const client = this.getClientProxy(service);
    return client.send({ cmd }, id ? { id, ...data } : data).toPromise();
  }

  @Delete(':service/:cmd/:id')
  async handleRequestDelete(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Param('id') id: string // Required parameter
  ) {
    const client = this.getClientProxy(service);
    return client.send({ cmd }, { id }).toPromise();
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
