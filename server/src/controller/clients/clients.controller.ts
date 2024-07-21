import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'server/src/common/filters/http-exception.filter';
import { Client } from 'server/src/Models/client.model';
import { CreateClientDto, UpdateClientDto } from 'server/src/Models/dto/client.dto';
import { ClientService } from 'server/src/services/client.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { Tag } from '../../Models/tag.model';

@ApiTags('clients')
@Controller('clients')
@UseFilters(HttpExceptionFilter) 
export class ClientController {

    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body(new ValidationPipe()) createClientDto: CreateClientDto): Promise<Client> {
        return await this.clientService.createClient(createClientDto);
    }

    @Get()
    async getAllClients(): Promise<Client[]> {
        return await this.clientService.getAllClients();
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchClient')
    async searchClient(@Body(new ValidationPipe()) body: {"id": string}): Promise<Client> {
        return await this.clientService.searchClient(body.id);
    }

    @Put()
    @ApiBody({ type: UpdateClientDto })
    async updateClient(@Body() updateClientDto: UpdateClientDto): Promise<Client> {
        return await this.clientService.updateClient(updateClientDto._id, updateClientDto);
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteClient(@Body(new ValidationPipe()) id: {"id": string}): Promise<boolean> {
        return await this.clientService.deleteClient(id.id);
    }
}
    // הוספת פרופרטי tag למוצא לבדוק אם הכול עובד כרגיל וכן להוסיף את לא אם Even the Their
