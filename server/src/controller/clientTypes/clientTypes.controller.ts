
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 
import { CreateClientTypeDto, UpdateClientTypeDto } from 'server/src/Models/dto/clientType.dto';
import { ClientTypeService } from 'server/src/services/clientType.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { ClientType } from 'server/src/Models/clientType.model';

@ApiTags('clientTypes')
@Controller('clientTypes')
@UseFilters(HttpExceptionFilter) 
export class ClientTypeController {

    constructor(private readonly clientTypeService: ClientTypeService) { }

    @Post()
    async createClientType(@Body(new ValidationPipe()) createClientTypeDto: CreateClientTypeDto): Promise<ClientType> {
        return await this.clientTypeService.createClientType(createClientTypeDto);
    }

    @Get()
    async getAllClientType(): Promise<ClientType[]> {
        return await this.clientTypeService.getALLClientTypes();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchClientType')
    async searchClientType(@Body(new ValidationPipe())  body:{"id":string}): Promise<ClientType> {
        return await this.clientTypeService.searchClientType(body.id);
    }
    @Put()
    async updateClientType(@Body(new ValidationPipe()) updateClientTypeDto: UpdateClientTypeDto): Promise<ClientType> {
        return await this.clientTypeService.updateClientType(updateClientTypeDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteClientType(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.clientTypeService.deleteClientType(id.id);
    }
}
