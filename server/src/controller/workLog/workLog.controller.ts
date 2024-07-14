import { Controller, Get, Post, Put, Body, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { CreateWorkLogDto, UpdateWorkLogDto } from '../../Models/dto/workLog.dto';
import { WorkLogService } from '../../services/workLog.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('work-log')
@Controller('work-log')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) { }

  @Post()
  async create(@Body() createWorkLogDto: CreateWorkLogDto) {
    return this.workLogService.create(createWorkLogDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWorkLogDto: UpdateWorkLogDto) {
    if (id !== updateWorkLogDto.id) {
      throw new HttpException('ID mismatch', HttpStatus.BAD_REQUEST);
    }
    return this.workLogService.update(id, updateWorkLogDto);
  }



  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workLogService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.workLogService.findAll();
  }

  @Get('export/:month/:year')
  async exportWorkLogs(@Param('month') month: number, @Param('year') year: number, @Res() res: Response) {
    const buffer = await this.workLogService.exportWorkLogs(month, year);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="work-logs-${month}-${year}.xlsx"`,
    });
    res.send(buffer);
  }
}
