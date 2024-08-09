
import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'; 
import { Client } from 'server/src/Models/client.model';
import { CreateClientDto, UpdateClientDto } from 'server/src/Models/dto/client.dto';
import { ClientService } from 'server/src/services/client.service';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import { TagService } from 'server/src/services/tag.service';
import { CreateTagDto, UpdateTagDto } from 'server/src/Models/dto/tag.dto';
import { Tag } from 'server/src/Models/tag.model';

@ApiTags('tags')
@Controller('tags')
@UseFilters(HttpExceptionFilter) 
@ApiBearerAuth()
export class TagController {

    constructor(private readonly tagService: TagService) { }

    @Post()
    async createTag(@Body(new ValidationPipe()) createClientDto: CreateTagDto): Promise<Tag> {
        return await this.tagService.createTag(createClientDto);
    }

    @Get()
    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.getAllTags();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchTag')
    async searchTag(@Body(new ValidationPipe())  body:{"id":string}): Promise<Tag[]> {
        return await this.tagService.searchTag(body.id);
    }
    @Put()
    async updateTag(@Body(new ValidationPipe()) updateTagDto: UpdateTagDto): Promise<Tag> {
        return await this.tagService.updateTag(updateTagDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteTag(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.tagService.deleteTag(id.id);
    }
}
