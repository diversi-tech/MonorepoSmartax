import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { SensitiveData } from '../../Models/sensitiveData.model';
import { Client } from 'server/src/Models/client.model';
import { SensitiveDataService } from 'server/src/services/sensitiveData.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSensitiveDataDto } from 'server/src/Models/dto/sensitiveData.dto';
@ApiTags('SensitiveData')
@Controller('SensitiveData')
export class SensitiveDataController {
  constructor(private readonly SensitiveDataService: SensitiveDataService) {}
  @Post(':id/add-encrypted-password')
  async addEncryptedPasswordToClient(
    @Param('id') clientId: string,
    @Body() encryptedPassword: CreateSensitiveDataDto
  ): Promise<Client> {
    return this.SensitiveDataService.addEncryptedPasswordToClient(
      clientId,
      encryptedPassword
    );
  }
  @Get(':id')
  async getEncryptedPasswordToClient(
    @Param('id') sensDataId: string
  ): Promise<SensitiveData> {
    return this.SensitiveDataService.getEncryptedPasswordToClient(sensDataId);
  }
}
