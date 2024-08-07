import { Controller, Post } from '@nestjs/common';

@Controller('popup')
export class PopupController {

  @Post('show')
  showPopup(): void {
  }
}
