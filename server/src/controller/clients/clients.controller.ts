import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'server/src/common/filters/http-exception.filter';
import { Client } from 'server/src/Models/client.model';
import { CreateClientDto, UpdateClientDto } from 'server/src/Models/dto/client.dto';
import { ClientService } from 'server/src/services/client.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { Tag } from '../../Models/tag.model';
import { AuthGuard } from 'server/src/guards/auth.guard';
import { RoleGuard } from 'server/src/guards/role.guard';

@ApiTags('clients')
@Controller('clients')
@UseFilters(HttpExceptionFilter) 
export class ClientController {

    constructor(private readonly clientService: ClientService) { }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post()
    async createClient(@Body(new ValidationPipe()) createClientDto: CreateClientDto): Promise<Client> {
        return await this.clientService.createClient(createClientDto);
    }
    // @UseGuards(AuthGuard, RoleGuard(3))
    @Get()
    async getAllClients(): Promise<Client[]> {
        return await this.clientService.getAllClients();
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchClient')
    async searchClient(@Body(new ValidationPipe()) body: {"id": string}): Promise<Client> {
        return await this.clientService.searchClient(body.id);
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Put()
    @ApiBody({ type: UpdateClientDto })
    async updateClient(@Body() updateClientDto: UpdateClientDto): Promise<Client> {
        return await this.clientService.updateClient(updateClientDto.id, updateClientDto);
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteClient(@Body(new ValidationPipe()) id: {"id": string}): Promise<boolean> {
        return await this.clientService.deleteClient(id.id);
    }
}
    // הוספת פרופרטי tag למוצא לבדוק אם הכול עובד כרגיל וכן להוסיף את לא אם Even the Their
