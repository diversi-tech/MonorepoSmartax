// import { Controller, Get, Post, Put, Body, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
// import { CreateWorkLogDto, UpdateWorkLogDto } from '../../Models/dto/workLog.dto';
// import { WorkLogService } from '../../services/workLog.service';
// import { Response } from 'express';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('work-log')
// @Controller('work-log')
// export class WorkLogController {
//   constructor(private readonly workLogService: WorkLogService) {}

//   @Post()
//   async create(@Body() createWorkLogDto: CreateWorkLogDto) {
//     try {
//       const newWorkLog = await this.workLogService.create(createWorkLogDto);
//       return {
//         statusCode: HttpStatus.CREATED,
//         message: 'Work log created successfully',
//         data: newWorkLog,
//       };
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateWorkLogDto: UpdateWorkLogDto) {
//     if (id !== updateWorkLogDto.id) {
//       throw new HttpException('ID mismatch', HttpStatus.BAD_REQUEST);
//     }
//     try {
//       const updatedWorkLog = await this.workLogService.update(id, updateWorkLogDto);
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'Work log updated successfully',
//         data: updatedWorkLog,
//       };
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     try {
//       const workLog = await this.workLogService.findOne(id);
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'Work log fetched successfully',
//         data: workLog,
//       };
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.NOT_FOUND);
//     }
//   }

//   @Get()
//   async findAll() {
//     try {
//       const workLogs = await this.workLogService.findAll();
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'Work logs fetched successfully',
//         data: workLogs,
//       };
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   @Get('export/:month/:year')
//   async exportWorkLogs(@Param('month') month: number, @Param('year') year: number, @Res() res: Response) {
//     try {
//       const buffer = await this.workLogService.exportWorkLogs(month, year);
//       res.set({
//         'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'Content-Disposition': `attachment; filename="work-logs-${month}-${year}.xlsx"`,
//       });
//       res.send(buffer);
//     } catch (error) {
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: error.message,
//       });
//     }
//   }
// }


// import { Controller, Post, Put, Param, Body, Get, Query, Res, HttpStatus } from '@nestjs/common';
// import { WorkLogService } from 'server/src/services/workLog.service';
// import { CreateWorkLogDto, UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
// import { WorkLog } from 'server/src/Models/workLog.model';
// import { Response } from 'express';

// @Controller('worklogs')
// export class WorkLogController {
//   constructor(private readonly workLogService: WorkLogService) {}

//   @Post()
//   async create(@Body() createWorkLogDto: CreateWorkLogDto): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.create(createWorkLogDto);
//     return { data: workLog };
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateWorkLogDto: UpdateWorkLogDto): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.update(id, updateWorkLogDto);
//     return { data: workLog };
//   }

//   @Put(':id/time-entries')
//   async updateTimeEntry(
//     @Param('id') id: string,
//     @Body() updateTimeEntryDto: UpdateTimeEntryDto
//   ): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.updateTimeEntry(id, updateTimeEntryDto);
//     return { data: workLog };
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.findOne(id);
//     return { data: workLog };
//   }

//   @Get()
//   async findAll(): Promise<{ data: WorkLog[] }> {
//     const workLogs = await this.workLogService.findAll();
//     return { data: workLogs };
//   }

//   @Get('export')
//   async exportWorkLogs(
//     @Query('month') month: number,
//     @Query('year') year: number,
//     @Res() res: Response
//   ): Promise<void> {
//     const buffer = await this.workLogService.exportWorkLogs(month, year);
//     res.set({
//       'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'Content-Disposition': 'attachment; filename=worklogs.xlsx',
//       'Content-Length': buffer.length,
//     });
//     res.status(HttpStatus.OK).send(buffer);
//   }
// }
import { Controller, Post, Put, Param, Body, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { WorkLogService } from 'server/src/services/workLog.service';
import { CreateWorkLogDto, UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
import { WorkLog } from 'server/src/Models/workLog.model';
import { Response } from 'express';

@Controller('worklogs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

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

  @Get()
  async findAll(): Promise<{ data: WorkLog[] }> {
    const workLogs = await this.workLogService.findAll();
    return { data: workLogs };
  }

  @Get('export')
  async exportWorkLogs(
    @Query('month') month: number,
    @Query('year') year: number,
    @Res() res: Response
  ): Promise<void> {
    const buffer = await this.workLogService.exportWorkLogs(month, year);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=worklogs.xlsx',
      'Content-Length': buffer.length.toString(), // Ensure Content-Length is a string
    });
    res.status(HttpStatus.OK).send(buffer);
  }
}
