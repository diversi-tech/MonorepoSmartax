import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { PopupGateway } from '../../services/socket/socket.gateway';

@Controller('popup')
@ApiBearerAuth()
export class PopupController {

  @Post('show')
  showPopup(): void {
  }
}
