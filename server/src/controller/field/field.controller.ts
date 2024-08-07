import { Controller, Get, Post, Put, Delete, Body, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'server/src/common/filters/http-exception.filter';
import { ApiBody, ApiTags} from '@nestjs/swagger';
import { FieldService } from 'server/src/services/field.service';
import { CreateFieldDto, UpdateFieldDto } from 'server/src/Models/dto/field.dto';
import { Field } from 'server/src/Models/field.model';

@ApiTags('field')
@Controller('field')
@UseFilters(HttpExceptionFilter) 
export class FieldController {

    constructor(private readonly fieldservice: FieldService) { }

    @Post()
    async createField(@Body(new ValidationPipe()) createFieldDto: CreateFieldDto): Promise<Field> {
        return await this.fieldservice.createField(createFieldDto);
    }

    @Get()
    async getAllFields(): Promise<Field[]> {
        return await this.fieldservice.getALLField();
    }

    @ApiBody({ schema: { type: 'string', properties: { id: { type: 'string' } } } })
    @Post('searchField')
    async searchField(@Body(new ValidationPipe()) body: {"id": string}): Promise<Field> {
        return await this.fieldservice.searchField(body.id);
    }

    @Put()
    async updateField(@Body(new ValidationPipe()) updateFieldDto: UpdateFieldDto): Promise<Field> {
        return await this.fieldservice.updateField(updateFieldDto);
    }

    @ApiBody({ schema: { type: 'string', properties: { id: { type: 'string' } } } })
    @Delete()
    async deleteField(@Body(new ValidationPipe()) id: {"id": string}): Promise<boolean> {
        return await this.fieldservice.deleteField(id.id);
    }
}
