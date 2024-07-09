import { Controller, Post, Body, UseFilters, Put, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { CreateDocTypeDto, UpdateDocTypeDto } from '../../Models/dto/docTypes.dto';
import { DocType } from 'server/src/Models/docType.model';
import { DocTypeService } from 'server/src/services/docTypes.service';

@ApiTags('DocTypes')
@Controller('DocTypes')
@UseFilters(HttpErrorFilter)
export class DocTypeController {
    constructor(private readonly DocTypeService: DocTypeService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new Docs Type' })
    @ApiBody({ type: CreateDocTypeDto })
    async create(@Body() CreateDocTypeDto: CreateDocTypeDto): Promise<DocType> {
        return await this.DocTypeService.createDocType(CreateDocTypeDto);
    }

    @Put()
    @ApiOperation({ summary: 'Update a Docs Type by ID' })
    @ApiBody({ type: UpdateDocTypeDto })
    async update(@Body() UpdateDocTypeDto: UpdateDocTypeDto): Promise<DocType> {
        return await this.DocTypeService.updateDocType(UpdateDocTypeDto.id, UpdateDocTypeDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Docs Type' })
    @ApiResponse({ status: 200, description: 'Return all Docs Type.' })
    async getAllDocTypeService(): Promise<DocType[]> {
        return await this.DocTypeService.getAllDocType();
    }
}
