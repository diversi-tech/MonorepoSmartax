import { Controller, Post, Body, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CommunicationsService } from '../../services/communication.service';
import { CreateCommunicationDto, UpdateCommunicationDto } from '../../Models/dto/communication.dto';
import { Communication } from '../../Models/communication.model';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { CommunicationArchive } from 'server/src/Models/communicationArchive.model';
import { RoleGuard } from 'server/src/guards/role.guard';
import { AuthGuard } from 'server/src/guards/auth.guard';

@ApiTags('communications')
@Controller('communications')
@UseFilters(HttpErrorFilter)
export class CommunicationsController {
    constructor(private readonly communicationsService: CommunicationsService) { }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post('create')
    @ApiOperation({ summary: 'Create a new communication' })
    @ApiBody({ type: CreateCommunicationDto })
    async create(@Body() createCommunicationDto: CreateCommunicationDto): Promise<Communication> {
        return this.communicationsService.createCommunication(createCommunicationDto);
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post('update')
    @ApiOperation({ summary: 'Update a communication by ID' })
    @ApiBody({ type: UpdateCommunicationDto })
    async update(@Body('id') id: string, @Body() updateCommunicationDto: UpdateCommunicationDto): Promise<Communication> {
        return this.communicationsService.updateCommunication(id, updateCommunicationDto);
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post('delete')
    @ApiOperation({ summary: 'Delete a communication by ID' })
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
    async delete(@Body() body: { id: string }): Promise<Communication> {
        return this.communicationsService.deleteCommunication(body.id);
    }
    @UseGuards(AuthGuard, RoleGuard(6))
    @Post('all')
    @ApiOperation({ summary: 'Get all communications' })
    async getAllCommunications(): Promise<Communication[]> {
        return this.communicationsService.getAllCommunications();
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post('by-client')
    @ApiOperation({ summary: 'Get communications by Client ID' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                clientId: {
                    type: 'string',
                    example: '123456789'
                }
            }
        }
    })
    async getCommunicationsByClientId(@Body() body: { clientId: string }): Promise<Communication[]> {
        return this.communicationsService.getCommunicationsByClientId(body.clientId);
    }
    @UseGuards(AuthGuard, RoleGuard(3))
    @Post('DeleteOldComunication')
    @ApiOperation({ summary: 'Delete old comunication and moved them to the communicationArchives table' })
    async deleteOldComunications(): Promise<Communication[]> {
        return this.communicationsService.deletingOldCommunications();
    }
}
