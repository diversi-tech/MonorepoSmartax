import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { CallTopicService } from 'server/src/services/callTopicSchema.service';
import { callTopicSchemaDto } from 'server/src/Models/dto/callTopicSchema.dto';
import { callTopicSchema } from 'server/src/Models/callTopicSchema.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('CallTopicController')
@Controller('CallTopicController')
export class CallTopicController {
  constructor(private readonly callTopicService: CallTopicService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCallTopicDto: callTopicSchemaDto): Promise<callTopicSchema> {
    return this.callTopicService.create(createCallTopicDto);
  }
  
  @Get()
  async findAll(): Promise<callTopicSchema[]> {
    return this.callTopicService.findAll();
  }
  @Post('all')
  @ApiOperation({ summary: 'Get all callTopic' })
  async getAll(): Promise<callTopicSchema[]> {
    return this.callTopicService.findAll();
  }
}
