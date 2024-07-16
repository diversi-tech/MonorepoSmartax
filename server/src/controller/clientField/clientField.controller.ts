import { Controller, Post, Body, Get, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientField } from 'server/src/Models/clientField.model';
import { CreateClientFieldDto } from 'server/src/Models/dto/clientField.dto';
import { ClientFieldService } from 'server/src/services/clientField.service';

@ApiTags('ClientField')
@Controller('ClientField')
export class ClientFieldController {
  constructor(private clientFieldService: ClientFieldService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new clientField' })
  @ApiBody({ type: CreateClientFieldDto })

  async createClient(@Body() createClientFieldDto: CreateClientFieldDto): Promise<ClientField> {
    try {
      const newClientField = await this.clientFieldService.createClientField(createClientFieldDto);
      return newClientField;
    } catch (error) {
        console.log(error);
      throw new HttpException(
        'Failed to create clientField',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      
    }
  }

  @Get()
  async getAllClientType(): Promise<ClientField[]> {
      return await this.clientFieldService.getALLClientFields();
  }


}