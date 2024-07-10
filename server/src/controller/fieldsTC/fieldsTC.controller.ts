import { Controller, Get, Post, Put, Delete, Body, NotFoundException, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'server/src/common/filters/http-exception.filter';
import {  ApiOperation ,ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import { Tag } from '../../Models/tag.model';
import { FieldsTCService } from 'server/src/services/fieldsTC.service';
import { CreateFieldsTCDto, UpdateFieldsCTDto } from 'server/src/Models/dto/fieldsCT.dto';
import { FieldsTC } from 'server/src/Models/fieldsCT.model';

@ApiTags('fieldsTC')
@Controller('fieldsTC')
@UseFilters(HttpExceptionFilter) 
export class FieldsTCController {

    constructor(private readonly fieldsTCService: FieldsTCService) { }

    @Post()
    async createFieldsTC(@Body(new ValidationPipe()) createFieldsTCDto: CreateFieldsTCDto): Promise<FieldsTC> {
        return await this.fieldsTCService.createFieldsTC(createFieldsTCDto);
    }

    @Get()
    async getAllFieldsTCs(): Promise<FieldsTC[]> {
        return await this.fieldsTCService.getALLFieldsTC();
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchFieldsTC')
    async searchFieldsTC(@Body(new ValidationPipe()) body: {"id": string}): Promise<FieldsTC> {
        return await this.fieldsTCService.searchFieldsTC(body.id);
    }

    @Put()
    async updateFieldsTC(@Body(new ValidationPipe()) updateFieldsTCDto: UpdateFieldsCTDto): Promise<FieldsTC> {
        return await this.fieldsTCService.updateFieldsTC(updateFieldsTCDto);
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteFieldsTC(@Body(new ValidationPipe()) id: {"id": string}): Promise<boolean> {
        return await this.fieldsTCService.deleteFieldsTC(id.id);
    }
}
    // הוספת פרופרטי tag למוצא לבדוק אם הכול עובד כרגיל וכן להוסיף את לא אם Even the Their
