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


import { Controller, Get, Post, Put, Body, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { CreateWorkLogDto, UpdateWorkLogDto } from '../../Models/dto/workLog.dto';
import { WorkLogService } from '../../services/workLog.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('work-log')
@Controller('work-log')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Post()
  async create(@Body() createWorkLogDto: CreateWorkLogDto) {
    try {
      const newWorkLog = await this.workLogService.create(createWorkLogDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Work log created successfully',
        data: newWorkLog,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWorkLogDto: UpdateWorkLogDto) {
    if (id !== updateWorkLogDto.id) {
      throw new HttpException('ID mismatch', HttpStatus.BAD_REQUEST);
    }
    try {
      const updatedWorkLog = await this.workLogService.update(id, updateWorkLogDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Work log updated successfully',
        data: updatedWorkLog,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const workLog = await this.workLogService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Work log fetched successfully',
        data: workLog,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async findAll() {
    try {
      const workLogs = await this.workLogService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Work logs fetched successfully',
        data: workLogs,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('export/:month/:year')
  async exportWorkLogs(@Param('month') month: number, @Param('year') year: number, @Res() res: Response) {
    try {
      const buffer = await this.workLogService.exportWorkLogs(month, year);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="work-logs-${month}-${year}.xlsx"`,
      });
      res.send(buffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
