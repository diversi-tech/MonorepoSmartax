import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment } from '../Models/payment.model';
import { CreatePaymentDto, UpdatePaymentDto } from '../Models/dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel('Payment') private readonly PaymentModel: Model<Payment>) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const createdPayment = new this.PaymentModel(createPaymentDto);
    return createdPayment.save();
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.PaymentModel.find().exec();
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.PaymentModel.findById(id).exec();
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const updatedPayment = await this.PaymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto,
      { new: true }
    ).exec();

    if (!updatedPayment) {
      throw new NotFoundException('Payment not found');
    }

    return updatedPayment;
  }

  async deletePayment(id: string): Promise<Payment> {
    const deletedPayment = await this.PaymentModel.findByIdAndDelete(id).exec();

    if (!deletedPayment) {
      throw new NotFoundException('Payment not found');
    }

    return deletedPayment;
  }
}
