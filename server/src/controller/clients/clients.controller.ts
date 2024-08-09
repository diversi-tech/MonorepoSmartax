import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { Client } from '../../Models/client.model';
import { CreateClientDto, UpdateClientDto } from '../../Models/dto/client.dto';
import { ClientService } from '../../services/client.service';
import { ApiOperation, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Tag } from '../../Models/tag.model';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

@ApiTags('clients')
@Controller('clients')
@UseFilters(HttpExceptionFilter)
@ApiBearerAuth()
export class ClientController {

    constructor(
        private readonly clientService: ClientService
    ) { }

    // @UseGuards(AuthGuard, RoleGuard(3))
    
    // @UseGuards(AuthGuard, RoleGuard(3))
    @Get()
    async getAllClients(): Promise<Client[]> {
        return await this.clientService.getAllClients();
    }
    // @UseGuards(AuthGuard, RoleGuard(3))
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchClient')
    async searchClient(@Body(new ValidationPipe()) body: { "id": string }): Promise<Client> {
        return await this.clientService.searchClient(body.id);
    }
    // @UseGuards(AuthGuard, RoleGuard(3))
    @Post()
    @ApiBody({ type: CreateClientDto })
    async createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
        console.log("controller",createClientDto);
        return await this.clientService.createClient(createClientDto);
    }
    @Put()
    @ApiBody({ type: UpdateClientDto })
    async updateClient(@Body() updateClientDto: UpdateClientDto): Promise<Client> {
        try { return await this.clientService.updateClient(updateClientDto._id, updateClientDto); } catch (err) {
            console.log(err);
        }
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteClient(@Body(new ValidationPipe()) id: { "id": string }): Promise<boolean> {
        return await this.clientService.deleteClient(id.id);
    }
}
