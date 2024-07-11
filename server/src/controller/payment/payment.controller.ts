import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from 'server/src/Models/dto/payment.dto';
import { Payment } from 'server/src/Models/payment.model';
import { PaymentsService } from 'server/src/services/payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      return await this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      throw new HttpException('Failed to create payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentsService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    try {
      return await this.paymentsService.getPaymentById(id);
    } catch (error) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async updatePayment(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    try {
      return await this.paymentsService.updatePayment(id, updatePaymentDto);
    } catch (error) {
      throw new HttpException('Failed to update payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string): Promise<Payment> {
    try {
      return await this.paymentsService.deletePayment(id);
    } catch (error) {
      throw new HttpException('Failed to delete payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
