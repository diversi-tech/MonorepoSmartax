// import { Controller, Post, Param, Body } from '@nestjs/common';
// import { ClientService } from './client.service';
// import { SensitiveData } from './schemas/sensitive-data.schema';

// @Controller('client')
// export class ClientController {
//     constructor(private readonly clientService: ClientService) { }
//     @Post(':id/add-encrypted-password')
//     async addEncryptedPasswordToClient(@Param('id') clientId: string,
//         @Body() encryptedPassword: SensitiveData): Promise<Client> {
//         return this.clientService.addEncryptedPasswordToClient(clientId, encryptedPassword);
//     }
// }