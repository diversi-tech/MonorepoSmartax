import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientField } from 'server/src/Models/clientField.model';
import { CreateClientFieldDto } from 'server/src/Models/dto/clientField.dto';
import { ClientFieldService } from 'server/src/services/clientField.service';

@ApiTags('ClientField')
@Controller('ClientField')
export class ClientFieldController {
  constructor(private clientFieldService: ClientFieldService) {}

  @Post()
  async createClient(@Body(new ValidationPipe()) createClientFieldDto: CreateClientFieldDto): Promise<ClientField> {
    return this.clientFieldService.createClientField(createClientFieldDto);
  }


}