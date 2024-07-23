import { Controller, Post, Body, Param, Inject, Get, Put, Delete, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiGatewayController {
  constructor(
    @Inject('TIMESHEET') private readonly workLogService: ClientProxy,
    // @Inject('OTHER_SERVICE') private readonly otherService: ClientProxy, // הוסף כאן שירותים נוספים לפי הצורך
  ) { }

  private getClientProxy(service: string): ClientProxy {
    switch (service) {
      case 'worklogs':
        return this.workLogService;
      // case 'otherService':
      // return this.otherService;
      // הוסף כאן שירותים נוספים לפי הצורך
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
    console.log('handleRequestGet called with:', { service, cmd, id });

    const requestPayload = id ? { employeeId: id } : {};
    console.log('Request Payload:', requestPayload);

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

  @Get(':service/:cmd/:month/:year')
  async handleRequestPostWithParams(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Param('month') month: number,
    @Param('year') year: number,
    @Body() data: any
  ) {
    const client = this.getClientProxy(service);
    return client.send({ cmd }, { month, year, ...data }).toPromise();
  }
  @Get(':service/:cmd/:employeeId/:month/:year')
  async handleRequestGetForExport(
    @Param('service') service: string,
    @Param('cmd') cmd: string,
    @Param('employeeId') employeeId: string,
    @Param('month') month: number,
    @Param('year') year: number
  ) {
    const client = this.getClientProxy(service);
    console.log('handleRequestGetForExport called with:', { service, cmd, employeeId, month, year });

    const requestPayload = { employeeId, month, year };
    console.log('Request Payload:', requestPayload);

    return client.send({ cmd }, requestPayload).toPromise();
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
