
import { Controller,UseFilters, Get } from '@nestjs/common';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { CommunicationArchiveService } from 'server/src/services/communicationArchive.service';
import { CommunicationArchive } from 'server/src/Models/communicationArchive.model';

@ApiTags('communicationArchive')
@Controller('communicationArchive')
@UseFilters(HttpErrorFilter)
export class CommunicationArchiveController {
    
    constructor(private readonly communicationArchivesService: CommunicationArchiveService) { }

    @Get('all')
    @ApiOperation({ summary: 'Get all CommunicationArchive' })
    async getAllArchiveCommunications(): Promise<CommunicationArchive[]> {
        return this.communicationArchivesService.getAllCommunications();
    }

    
}