import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateYearlyReportDto, UpdateYearlyReportDto } from "server/src/Models/dto/yearlyReport.dbo";
import { YearlyReport, YearlyReportstModel } from "server/src/Models/yearlyReports.model";
import { YearlyReportService } from "server/src/services/yearlyReport.service";

@ApiTags('yearly-reports')
@Controller('yearly-reports')
@UseFilters(HttpErrorFilter)
@ApiBearerAuth()
export class YearlyReportController{
    constructor(private readonly yearlyReportService: YearlyReportService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new yearly report' })
  @ApiBody({ type: CreateYearlyReportDto })
  async create(@Body() createYearlyReportDto: CreateYearlyReportDto): Promise<YearlyReport> {
    try {
    return this.yearlyReportService.createYearlyReport(createYearlyReportDto);
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a yearly report by ID' })
  @ApiBody({ type: UpdateYearlyReportDto })
  async update(@Param('id') id: string, @Body() updateYearlyReportDto: UpdateYearlyReportDto): Promise<YearlyReport> {
    try {
      return this.yearlyReportService.updateYearlyReport(id, updateYearlyReportDto);
    }
      catch (error) {
        console.log(error);
        throw new Error(error);
      }
  } 

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a yearly report by ID' })
 
  async delete(@Param('id') id: string): Promise<void> {
    return this.yearlyReportService.deleteYearlyReport(id);
  }

  
  @Get('all')
  @ApiOperation({ summary: 'Get all yearly reports' })
  async getAllYearlyReports(): Promise<YearlyReport[]> {
    return this.yearlyReportService.getAllYearlyReports();
  }


}