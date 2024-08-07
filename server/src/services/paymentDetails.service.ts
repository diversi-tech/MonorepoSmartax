import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ValidationException } from "../common/exceptions/validation.exception";
import { PaymentDetails } from "../Models/paymentDetails.model";
import { CreatePaymentDetailsDto, UpdatePaymentDetailsDto } from "../Models/dto/paymentDetails.dto";

@Injectable()
export class PaymentDetailsService {

    constructor(@InjectModel('PaymentDetails') private readonly PaymentDetailsModel: Model<PaymentDetails>) {}

    async createPaymentDetails(createPaymentDetailsDto: CreatePaymentDetailsDto): Promise<PaymentDetails> {
        const { sumForMonth,maxHours,frequency, dateStart, dateFinish, description } = createPaymentDetailsDto;      
        if (!sumForMonth || !dateStart) {
          throw new ValidationException('Missing required fields');
        }

        const createdPaymentDetails = new this.PaymentDetailsModel({ 
            sumForMonth, 
            maxHours,
            frequency,
            dateStart, 
            dateFinish, 
            description 
        });        
        return await createdPaymentDetails.save();
    }

    async getAllFrequencies(): Promise<PaymentDetails[]> {
        return await this.PaymentDetailsModel.find().exec();
    }

    async searchPaymentDetails(id:string): Promise<PaymentDetails[]> {
        const paymentDetails = await this.PaymentDetailsModel.find({"_id":id}).exec();
        if (!paymentDetails || paymentDetails.length === 0) {
            throw new NotFoundException('PaymentDetails not found');
        }
        return paymentDetails;
    }
    async getPaymentDetailsById(id: string): Promise<PaymentDetails> {
        try {
            const PaymentDetails = await this.PaymentDetailsModel.findById(id).exec();
            if (!PaymentDetails) {
                throw new NotFoundException('PaymentDetails not found');
            }
            return PaymentDetails;
        } catch (err) {
            console.log(err);

        }
    }

    async updatePaymentDetails(updatePaymentDetailsDto: UpdatePaymentDetailsDto): Promise<PaymentDetails> {
        const { _id, ...updateData } = updatePaymentDetailsDto;
        const updatedPaymentDetails = await this.PaymentDetailsModel.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedPaymentDetails) {
            throw new NotFoundException(`PaymentDetails with ID ${_id} not found`);
        }
        return updatedPaymentDetails;
    }

    async deletePaymentDetails(id: string): Promise<boolean> {
        const deletedPaymentDetails = await this.PaymentDetailsModel.findByIdAndDelete(id);
        if (!deletedPaymentDetails) {
            throw new NotFoundException(`PaymentDetails with ID ${id} not found`);
        }
        return !!deletedPaymentDetails;
    }
}
