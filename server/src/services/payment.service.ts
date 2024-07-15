import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Payment } from "../Models/payment.model";
import { CreatePaymentDto, UpdatePaymentDto } from "../Models/dto/payment.dto";
import { ValidationException } from "../common/exceptions/validation.exception";

import { BillingsService } from "./billing.service";
import { CreateBillingDto } from "../Models/dto/billing.dto";
import { PaymentDetails } from "../Models/paymentDetails.model";
import { CreatePaymentDetailsDto } from "../Models/dto/paymentDetails.dto";
import { PaymentDetailsService } from "./paymentDetails.service";




@Injectable()
export class PaymentService {

    constructor(@InjectModel('Payment') private readonly PaymentModel: Model<Payment>,private billingService: BillingsService,private PaymentDetailsService: PaymentDetailsService) {}

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { paymentDetails,totalPayment,paymentMethod,paymentHistory,billingHistory } = createPaymentDto;

        if (!paymentDetails || !paymentMethod) {
          throw new ValidationException('Missing required fields');
        }
        const createdPayment = new this.PaymentModel({ paymentDetails,totalPayment,paymentMethod,paymentHistory,billingHistory });
        return await createdPayment.save();
    }

    async getAllFrequencies(): Promise<Payment[]> {
        return await this.PaymentModel.find().exec();
    }
    async searchPayment(id:string): Promise<Payment[]> {
        const Payment= await this.PaymentModel.find({"_id":id}).exec();
        if (!Payment || Payment.length === 0) {
            throw new NotFoundException('Payment not found');
          }
          return Payment;
    }
    async updatePayment(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        const {id, ...updateData } = updatePaymentDto;
        const updatedPayment = await this.PaymentModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPayment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return updatedPayment;
    }

    async deletePayment(id: string): Promise<boolean> {
        const deletedPayment = await this.PaymentModel.findByIdAndDelete(id);
        if (!deletedPayment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return !!deletedPayment;
    }
    

    async addBillingToPayment(paymentId: string, billing: CreateBillingDto): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
          throw new NotFoundException('Payment not found');
        }
      
        // הנח ש-createBilling מחזירה אובייקט שמכיל ObjectId מסוג TypeORM
        const newBilling = await this.billingService.createBilling(billing);
      
        // המרת TypeORM ObjectId ל-Mongoose ObjectId
        const mongooseObjectId = new Types.ObjectId(newBilling._id.toString());
      
        payment.billingHistory.push(mongooseObjectId);
      
        return payment.save();
      }


      async updatePaymentDetails(paymentId: string, newPaymentDetails: CreatePaymentDetailsDto): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
          throw new NotFoundException('Payment not found');
        }
        // Add the current paymentDetails to paymentHistory
        const currentPaymentDetails = payment.paymentDetails;
        if (currentPaymentDetails && currentPaymentDetails._id) {
            const mongooseObjectId = new Types.ObjectId(currentPaymentDetails._id.toString());
          payment.paymentHistory.push(mongooseObjectId);
        }
        // Update the paymentDetails with the new data
        payment.paymentDetails =await this.PaymentDetailsService.createPaymentDetails(newPaymentDetails);
        return payment.save();
      }
}
