import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto, UpdateRoleDto } from "server/src/Models/dto/role.dto";
import { Role } from "../../Models/role.modle";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { RoleService } from "server/src/services/role.service";
import { YearService } from "server/src/services/year.service";
import { createYearDto } from "server/src/Models/dto/year.dto";
import { Year } from "server/src/Models/year.model";

@ApiTags('years')
@Controller('years')
@UseFilters(HttpExceptionFilter) 
export class YearController {

    constructor(private readonly yearService: YearService ) { }

    @Post()
    async createRole(@Body(new ValidationPipe()) createYearDto: createYearDto): Promise<Year> {
        return await this.yearService.createYear(createYearDto);
    }

    @Get('all')
    async getAllYears(): Promise<Year[]> {
        return await this.yearService.getAllYear();
    }
   
  

    
    @Post('delete')
  @ApiOperation({ summary: 'Delete yaer' })
  async delete(@Body() body: { id: string }): Promise<Year> {
    return this.yearService.deleteYear(body.id);
  }

}
