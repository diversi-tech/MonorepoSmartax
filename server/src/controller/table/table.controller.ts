import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'server/src/common/filters/http-exception.filter';
import { TableService } from 'server/src/services/table.service';

@ApiTags('tables')
@Controller('tables')
@UseFilters(HttpExceptionFilter) 
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tables with properties' })
  async getAllCollections(){
    try {
      return await this.tableService.getNestedTables();
    } catch (error) {
      throw new Error('Failed to get collections in controller');
    }
}
}