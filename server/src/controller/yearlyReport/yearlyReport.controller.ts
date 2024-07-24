import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateYearlyReportDto, UpdateYearlyReportDto } from "server/src/Models/dto/yearlyReport.dbo";
import { YearlyReport, YearlyReportstModel } from "server/src/Models/yearlyReports.model";
import { YearlyReportService } from "server/src/services/yearlyReport.service";

@ApiTags('yearly-reports')
@Controller('yearly-reports')
@UseFilters(HttpErrorFilter)
export class YearlyReportController{
    constructor(private readonly yearlyReportService: YearlyReportService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new yearly report' })
  @ApiBody({ type: CreateYearlyReportDto })
  async create(@Body() createYearlyReportDto: CreateYearlyReportDto): Promise<YearlyReport> {
    return this.yearlyReportService.createYearlyReport(createYearlyReportDto);
  }




  @Post('update/:id')
  @ApiOperation({ summary: 'Update a yearly report by ID' })
  @ApiBody({ type: UpdateYearlyReportDto })
  async update(@Param('id') id: string, @Body() updateYearlyReportDto: UpdateYearlyReportDto): Promise<YearlyReport> {
    return this.yearlyReportService.updateYearlyReport(id, updateYearlyReportDto);
  } 

  @Post('delete')
  @ApiOperation({ summary: 'Delete a yearly report by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '667211d6c'
        }
      }
    }
  })
  async delete(@Body() body: { id: string }): Promise<void> {
    return this.yearlyReportService.deleteYearlyReport(body.id);
  }

  
  @Get('all')
  @ApiOperation({ summary: 'Get all yearly reports' })
  async getAllYearlyReports(): Promise<YearlyReport[]> {
    return this.yearlyReportService.getAllYearlyReports();
  }


}