
import { Controller, UseFilters, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { TaskArchiveService } from 'server/src/services/taskArchive.service';
import { TaskArchive } from 'server/src/Models/taskArchive.model';

@ApiTags('TaskArchive')
@Controller('TaskArchive')
@UseFilters(HttpErrorFilter)
export class taskArchiveController {
    
    constructor(private readonly taskArchivesService: TaskArchiveService) { }

    @Get('all')
    @ApiOperation({ summary: 'Get all taskArchive' })
    async getAllArchiveTasks(): Promise<TaskArchive[]> {
        return this.taskArchivesService.getAllTask();
    }
    
}