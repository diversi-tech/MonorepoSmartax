import { Controller, Post, Put, Param, Body, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { WorkLogService } from '../../services/workLog.service';
import { CreateWorkLogDto, UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
import { WorkLog } from '../../Models/workLog.model';
import { Response } from 'express';
import { log } from 'console';

@Controller('worklogs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) { }

  @Post()
  async create(@Body() createWorkLogDto: CreateWorkLogDto): Promise<{ data: WorkLog }> {
    const workLog = await this.workLogService.create(createWorkLogDto);
    return { data: workLog };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWorkLogDto: UpdateWorkLogDto): Promise<{ data: WorkLog }> {
    const workLog = await this.workLogService.update(id, updateWorkLogDto);
    return { data: workLog };
  }

  @Put(':id/time-entries')
  async updateTimeEntry(
    @Param('id') id: string,
    @Body() updateTimeEntryDto: UpdateTimeEntryDto
  ): Promise<{ data: WorkLog }> {
    const workLog = await this.workLogService.updateTimeEntry(id, updateTimeEntryDto);
    return { data: workLog };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ data: WorkLog }> {
    const workLog = await this.workLogService.findOne(id);
    return { data: workLog };
  }

  @Get('findAll')
  async findAll(): Promise<{ data: WorkLog[] }> {
    console.log("ettyLehiman");
    
    const workLogs = await this.workLogService.findAll();
    return { data: workLogs };
  }

  @Get('employee/:employeeId')
  async findByEmployeeId(@Param('employeeId') employeeId: string): Promise<{ data: WorkLog[] }> {
    const workLogs = await this.workLogService.findByEmployeeId(employeeId);
    return { data: workLogs };
  }

  @Get('export/:month/:year')
  async exportWorkLogs(
    @Param('month') month: number,
    @Param('year') year: number,
    @Res() res: Response
  ): Promise<void> {
    console.log(`Received request to export work logs for month: ${month}, year: ${year}`);
    try {
      const buffer = await this.workLogService.exportWorkLogs(month, year);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      console.error('Error exporting work logs:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error exporting work logs');
    }
  }
  @Get('export/:employeeId/:month/:year')
  async exportWorkLogsForEmployee(
    @Param('employeeId') employeeId: string,
    @Param('month') month: number,
    @Param('year') year: number,
    @Res() res: Response
  ): Promise<void> {
    console.log(`Received request to export work logs for employeeId: ${employeeId}, month: ${month}, year: ${year}`);
    try {
      const buffer = await this.workLogService.exportWorkLogsForEmployee(employeeId, month, year);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=worklogs.xlsx',
        'Content-Length': buffer.length.toString(),
      });
      res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      console.error('Error exporting work logs for employee:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error exporting work logs for employee');
    }
  }
}

// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { WorkLogService } from '../../services/workLog.service';
// import { UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
// import { WorkLog } from '../../Models/workLog.model';

// @Controller('worklogs')
// export class WorkLogController {

//   constructor(private readonly workLogService: WorkLogService) { }

//   @MessagePattern({ cmd: 'create' })
//   async create(data: any): Promise<{ data: WorkLog }> {
//     if (!data.date || !data.employeeId) {
//       throw new Error('Missing required fields: date and employeeId');
//     }
//     const workLog = await this.workLogService.create(data);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'update' })
//   async update(data: { id: string, updateWorkLogDto: UpdateWorkLogDto }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.update(data.id, data.updateWorkLogDto);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'updateTimeEntry' })
//   async updateTimeEntry(data: { id: string, updateTimeEntryDto: UpdateTimeEntryDto }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.updateTimeEntry(data.id, data.updateTimeEntryDto);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'findOne' })
//   async findOne(data: { id: string }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.findOne(data.id);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'findAll' })
//   async findAll(): Promise<{ data: WorkLog[] }> {
//     const workLogs = await this.workLogService.findAll();
//     return { data: workLogs };
//   }

//   @MessagePattern({ cmd: 'findByEmployeeId' })
//   async findByEmployeeId(data: { employeeId: string }): Promise<{ data: WorkLog[] }> {
//     const workLogs = await this.workLogService.findByEmployeeId(data.employeeId);
//     return { data: workLogs };
//   }

//   @MessagePattern({ cmd: 'export' })
//   async exportWorkLogs(data: { month: number, year: number }): Promise<Buffer> {
//     const { month, year } = data;
//     try {
//       const buffer = await this.workLogService.exportWorkLogs(month, year);
//       if (!buffer) {
//         throw new Error('Buffer is undefined');
//       }
//       return buffer;
//     } catch (error) {
//       console.error('Error exporting work logs:', error);
//       throw error;
//     }
//   }

//   @MessagePattern({ cmd: 'exportForEmployee' })
//   async exportWorkLogsForEmployee(data: { employeeId: string, month: number, year: number }): Promise<Buffer> {
//     const { employeeId, month, year } = data;
//     try {
//       const buffer = await this.workLogService.exportWorkLogsForEmployee(employeeId, month, year);
//       if (!buffer) {
//         throw new Error('Buffer is undefined');
//       }
//       return buffer;
//     } catch (error) {
//       console.error('Error exporting work logs for employee:', error);
//       throw error;
//     }
//   }
// }
// // import { Controller } from '@nestjs/common';
// // import { MessagePattern } from '@nestjs/microservices';
// // import { WorkLogService } from '../../services/workLog.service';
// // import { UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
// // import { WorkLog } from '../../Models/workLog.model';

// // @Controller('worklogs')
// // export class WorkLogController {

// //   constructor(private readonly workLogService: WorkLogService) { }

// //   @MessagePattern({ cmd: 'create' })
// //   async create(data: any): Promise<{ data: WorkLog }> {
// //     if (!data.date || !data.employeeId) {
// //       throw new Error('Missing required fields: date and employeeId');
// //     }
// //     const workLog = await this.workLogService.create(data);
// //     return { data: workLog };
// //   }

// //   @MessagePattern({ cmd: 'update' })
// //   async update(data: { id: string, updateWorkLogDto: UpdateWorkLogDto }): Promise<{ data: WorkLog }> {
// //     const workLog = await this.workLogService.update(data.id, data.updateWorkLogDto);
// //     return { data: workLog };
// //   }

// //   @MessagePattern({ cmd: 'updateTimeEntry' })
// //   async updateTimeEntry(data: { id: string, updateTimeEntryDto: UpdateTimeEntryDto }): Promise<{ data: WorkLog }> {
// //     const workLog = await this.workLogService.updateTimeEntry(data.id, data.updateTimeEntryDto);
// //     return { data: workLog };
// //   }

// //   @MessagePattern({ cmd: 'findOne' })
// //   async findOne(data: { id: string }): Promise<{ data: WorkLog }> {
// //     const workLog = await this.workLogService.findOne(data.id);
// //     return { data: workLog };
// //   }

// //   @MessagePattern({ cmd: 'findAll' })
// //   async findAll(): Promise<{ data: WorkLog[] }> {
// //     const workLogs = await this.workLogService.findAll();
// //     return { data: workLogs };
// //   }

// //   @MessagePattern({ cmd: 'findByEmployeeId' })
// //   async findByEmployeeId(data: { employeeId: string }): Promise<{ data: WorkLog[] }> {
// //     const workLogs = await this.workLogService.findByEmployeeId(data.employeeId);
// //     return { data: workLogs };
// //   }

// //   @MessagePattern({ cmd: 'export' })
// //   async exportWorkLogs(data: { month: number, year: number }): Promise<Buffer> {
// //     const { month, year } = data;
// //     try {
// //       const buffer = await this.workLogService.exportWorkLogs(month, year);
// //       if (!buffer) {
// //         throw new Error('Buffer is undefined');
// //       }
// //       return buffer;
// //     } catch (error) {
// //       console.error('Error exporting work logs:', error);
// //       throw error;
// //     }
// //   }

// //   @MessagePattern({ cmd: 'exportForEmployee' })
// //   async exportWorkLogsForEmployee(data: { employeeId: string, month: number, year: number }): Promise<Buffer> {
// //     const { employeeId, month, year } = data;
// //     try {
// //       const buffer = await this.workLogService.exportWorkLogsForEmployee(employeeId, month, year);
// //       if (!buffer) {
// //         throw new Error('Buffer is undefined');
// //       }
// //       return buffer;
// //     } catch (error) {
// //       console.error('Error exporting work logs for employee:', error);
// //       throw error;
// //     }
// //   }
// // }