import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { CreatefrequencyDto, UpdatefrequencyDto } from "server/src/Models/dto/frequency.dto";
import { Frequency } from "server/src/Models/frequency.model";
import { FrequencyService } from "server/src/services/frequency.service"

@ApiTags('Frequency')
@Controller('Frequency')
@UseFilters(HttpExceptionFilter) 
@ApiBearerAuth()
export class FrequencyController {

    constructor(private readonly FrequencyService: FrequencyService) { }

    @Post()
    async createFrequency(@Body(new ValidationPipe()) createClientDto: CreatefrequencyDto): Promise<Frequency> {
        return await this.FrequencyService.createFrequency(createClientDto);
    }

    @Get()
    async getAllFrequencys(): Promise<Frequency[]> {
        return await this.FrequencyService.getAllFrequencies();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchFrequency')
    async searchFrequency(@Body(new ValidationPipe())  body:{"id":string}): Promise<Frequency[]> {
        return await this.FrequencyService.searchFrequency(body.id);
    }
    @Put()
    async updateFrequency(@Body(new ValidationPipe()) updateFrequencyDto: UpdatefrequencyDto): Promise<Frequency> {
        return await this.FrequencyService.updateFrequency(updateFrequencyDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteFrequency(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.FrequencyService.deleteFrequency(id.id);
    }
}
