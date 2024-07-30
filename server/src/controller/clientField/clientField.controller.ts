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

  @Get()
  async getAllClientType(): Promise<ClientField[]> {
      return await this.clientFieldService.getALLClientFields();
  }


}