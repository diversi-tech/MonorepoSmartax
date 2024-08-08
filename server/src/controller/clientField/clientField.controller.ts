import { Controller, Post, Body, Get, ValidationPipe, HttpException, HttpStatus, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientField } from 'server/src/Models/clientField.model';
import { CreateClientFieldDto, UpdateClientFieldDto } from 'server/src/Models/dto/clientField.dto';
import { ClientFieldService } from 'server/src/services/clientField.service';

@ApiTags('ClientField')
@Controller('ClientField')
@ApiBearerAuth()
export class ClientFieldController {
  constructor(private clientFieldService: ClientFieldService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new clientField' })
  @ApiBody({ type: CreateClientFieldDto })

  async createClient(@Body() createClientFieldDto: CreateClientFieldDto ,@Body('clientId') clientId: string,
): Promise<ClientField> {
    try {
      const newClientField = await this.clientFieldService.createClientField(createClientFieldDto, clientId);
      return newClientField;
    } catch (error) {
        console.log(error);
      throw new HttpException(
        'Failed to create clientField',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      
    }
  }

   @ApiBody({
    schema: { type: 'object', properties: { clientTypeId: { type: 'string' }, clientId: { type: 'string' }} },
  })
  @Post('createByClientType')
  async createClientFieldsByClientType(
        @Body(new ValidationPipe()) body: { clientTypeId: string,clientId: string}
  ): Promise<ClientField[]> {
    return this.clientFieldService.createClientFieldsByClientType( body.clientTypeId, body.clientId);
  }

  @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
  @Post('searchClientField')
  async searchClientField(@Body(new ValidationPipe()) body: { "id": string }): Promise<ClientField> {
    return await this.clientFieldService.searchClientField(body.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientFieldDto: UpdateClientFieldDto): Promise<ClientField> {
    try {
      return this.clientFieldService.updateClientField(id, updateClientFieldDto);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  @Get()
  async getAllClientType(): Promise<ClientField[]> {
      return await this.clientFieldService.getALLClientFields();
  }


}