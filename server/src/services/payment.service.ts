import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment } from "../Models/payment.model";
import { CreatePaymentDto, UpdatePaymentDto } from "../Models/dto/payment.dto";
import { ValidationException } from "../common/exceptions/validation.exception";

@Injectable()
export class PaymentService {

    // constructor(@InjectModel('Payment') private readonly PaymentModel: Model<Payment>) {}

    // async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    //     const { paymentDetails,totalPayment,paymentMethod } = createPaymentDto;

    //     if (!color || !name ) {
    //       throw new ValidationException('Missing required fields');
    //     }
    //     const createdPayment = new this.PaymentModel({ color,name });
    //     return await createdPayment.save();
    // }

    // async getAllFrequencies(): Promise<Payment[]> {
    //     return await this.PaymentModel.find().exec();
    // }
    // async searchPayment(id:string): Promise<Payment[]> {
    //     const Payment= await this.PaymentModel.find({"_id":id}).exec();
    //     if (!Payment || Payment.length === 0) {
    //         throw new NotFoundException('Payment not found');
    //       }
    //       return Payment;
    // }
    // async updatePayment(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    //     const {id, ...updateData } = updatePaymentDto;
    //     const updatedPayment = await this.PaymentModel.findByIdAndUpdate(id, updateData, { new: true });
    //     if (!updatedPayment) {
    //         throw new NotFoundException(`Payment with ID ${id} not found`);
    //     }
    //     return updatedPayment;
    // }

    // async deletePayment(id: string): Promise<boolean> {
    //     const deletedPayment = await this.PaymentModel.findByIdAndDelete(id);
    //     if (!deletedPayment) {
    //         throw new NotFoundException(`Payment with ID ${id} not found`);
    //     }
    //     return !!deletedPayment;
    // }
}
