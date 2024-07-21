import { Controller, Post, Put, Param, Body, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { WorkLogService } from 'server/src/services/workLog.service';
import { CreateWorkLogDto, UpdateWorkLogDto, UpdateTimeEntryDto } from '../../Models/dto/workLog.dto';
import { WorkLog } from 'server/src/Models/workLog.model';
import { Response } from 'express';

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

  @Get()
  async findAll(): Promise<{ data: WorkLog[] }> {
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
