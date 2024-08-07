import { Controller, Post, Body, Param, Inject, Get, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';

@Controller('api')
export class ApiGatewayController {
  constructor(
    @Inject('TIMESHEET') private readonly workLogService: ClientProxy,
  ) { }

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
    try {
      const result = await client.send<{ type: string; data: number[] }>({ cmd: 'export' }, { month, year }).toPromise();
      if (!result || !result.data) {
        throw new Error('Buffer is undefined');
      }
      const buffer = Buffer.from(result.data);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error exporting work logs');
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
    try {
      const result = await client.send<{ type: string; data: number[] }>({ cmd: 'exportForEmployee' }, { employeeId, month, year }).toPromise();
      if (!result || !result.data) {
        throw new Error('Buffer is undefined');
      }
      const buffer = Buffer.from(result.data);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error exporting work logs for employee');
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