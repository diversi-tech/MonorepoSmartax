// popup.controller.ts
import { Controller, Post } from '@nestjs/common';
// import { PopupGateway } from '../../services/socket/socket.gateway';

@Controller('popup')
export class PopupController {
  // constructor(private readonly popupGateway: PopupGateway) {}

  @Post('show')
  showPopup(): void {
    // this.popupGateway.showPopup();
  }
}
