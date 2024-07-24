import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateMonthlyReportDto, UpdateMonthlyReportDto } from "server/src/Models/dto/monthlyReport.dto";
import { MonthlyReport} from "server/src/Models/monthlyReport.model";
import { MonthlyReportService } from "server/src/services/monthlyReport.service";

@ApiTags('monthly-report')
@Controller('monthly-report')
@UseFilters(HttpErrorFilter)
export class MonthlyReportController{
    constructor(private readonly MonthlyReportService: MonthlyReportService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new monthly report' })
  @ApiBody({ type: CreateMonthlyReportDto })
  async create(@Body() createMonthlyReportDto: CreateMonthlyReportDto): Promise<MonthlyReport> {
    return this.MonthlyReportService.createMonthlyReport(createMonthlyReportDto);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a monthly report by ID' })
  @ApiBody({ type: UpdateMonthlyReportDto })
  async update(@Param('id') id: string, @Body() updateMonthlyReportDto: UpdateMonthlyReportDto): Promise<MonthlyReport> {
    return this.MonthlyReportService.updateMonthlyReport(id, updateMonthlyReportDto);
  } 

  @Post('delete')
  @ApiOperation({ summary: 'Delete a monthly report by ID' })
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
    return this.MonthlyReportService.deleteMonthlyReport(body.id);
  }

  
  @Get('all')
  @ApiOperation({ summary: 'Get all monthly report' })
  async getAllMonthlyReport(): Promise<MonthlyReport[]> {
    return this.MonthlyReportService.getAllMonthlyReport();
  }
}