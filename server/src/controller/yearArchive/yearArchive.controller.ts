import { Body, Controller, Delete, Get, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { YearArchive } from "server/src/Models/yearArchive.model";

import { YearArchiveService } from "server/src/services/yearArchive.service";

@ApiTags('yearsArchive')
@Controller('yearsArchive')
@UseFilters(HttpExceptionFilter)
export class YearArchiveController {

  constructor(private readonly yearArchiveService: YearArchiveService) { }


  @Get('all')
  async getAllYearsArchive(): Promise<YearArchive[]> {
    return await this.yearArchiveService.getAllYear();
  }
  @Delete('delete yearArchive')
  @ApiBody({ schema: { type: 'string' } })
  @ApiOperation({ summary: 'Delete yearArchive' })
  async delete(@Body() body: { id: string }): Promise<YearArchive> {
    return this.yearArchiveService.deleteYearArchive(body.id);
  }
}
