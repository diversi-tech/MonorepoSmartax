import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { Schema } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { createYearArchiveDto, updateYearArchiveDto } from "server/src/Models/dto/yearArchive.dto";
import { Task } from "server/src/Models/task.model";
import { YearArchive } from "server/src/Models/yearArchive.model";

import { YearArchiveService } from "server/src/services/yearArchive.service";

@ApiTags('yearsArchive')
@Controller('yearsArchive')
@UseFilters(HttpExceptionFilter) 
@ApiBearerAuth()
export class YearArchiveController {

    constructor(private readonly yearArchiveService: YearArchiveService ) { }

    // @Post('addTask')
    // async addTask(@Body()task:Task): Promise<YearArchive> {
    //     return await this.yearArchiveService.addTaskToYearArchive((new Date()).toString(),task);
    // }

    @Get('all')
    async getAllYearsArchive(): Promise<YearArchive[]> {
        return await this.yearArchiveService.getAllYear();
    }
    @Delete('delete yearArchive')
  @ApiBody({schema: { type: 'string'}})
  @ApiOperation({ summary: 'Delete yearArchive'}) 
  async delete(@Body() body: { id: string }): Promise<YearArchive> {
    return this.yearArchiveService.deleteYearArchive(body.id);
  }

}
