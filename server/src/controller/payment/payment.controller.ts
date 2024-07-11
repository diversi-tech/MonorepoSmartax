import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from 'server/src/Models/dto/payment.dto';
import { Payment } from 'server/src/Models/payment.model';

@Controller('payment')
export class PaymentController {
  constructor() {}

  
 
 

  // @Patch(':id')
  // async updatePayment(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
  //   try {
  //     return await this.paymentsService.updatePayment(id, updatePaymentDto);
  //   } catch (error) {
  //     throw new HttpException('Failed to update payment', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @Delete(':id')
  // async deletePayment(@Param('id') id: string): Promise<Payment> {
  //   try {
  //     return await this.paymentsService.deletePayment(id);
  //   } catch (error) {
  //     throw new HttpException('Failed to delete payment', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
