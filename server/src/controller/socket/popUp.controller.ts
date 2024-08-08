// popup.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { PopupGateway } from '../../services/socket/socket.gateway';

@Controller('popup')
@ApiBearerAuth()
export class PopupController {
  // constructor(private readonly popupGateway: PopupGateway) {}

  @Post('show')
  showPopup(): void {
    // this.popupGateway.showPopup();
  }
}
