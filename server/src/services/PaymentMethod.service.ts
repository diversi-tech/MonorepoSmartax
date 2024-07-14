import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from "../Models/dto/paymentMethod.dto";
import { Model } from "mongoose";
import { PaymentMethod } from "../Models/paymentMethod.model";
import { ValidationException } from "../common/exceptions/validation.exception";

@Injectable()
export class PaymentMethodService {

    constructor(@InjectModel('PaymentMethod') private readonly PaymentMethodModel: Model<PaymentMethod>) {}

    async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        const { color,name } = createPaymentMethodDto;

        if (!color || !name ) {
          throw new ValidationException('Missing required fields');
        }
        const createdPaymentMethod = new this.PaymentMethodModel({ color,name });
        return await createdPaymentMethod.save();
    }

    async getAllFrequencies(): Promise<PaymentMethod[]> {
        return await this.PaymentMethodModel.find().exec();
    }
    async searchPaymentMethod(id:string): Promise<PaymentMethod[]> {
        const PaymentMethod= await this.PaymentMethodModel.find({"_id":id}).exec();
        if (!PaymentMethod || PaymentMethod.length === 0) {
            throw new NotFoundException('PaymentMethod not found');
          }
          return PaymentMethod;
    }
    async updatePaymentMethod(updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
        const {id, ...updateData } = updatePaymentMethodDto;
        const updatedPaymentMethod = await this.PaymentMethodModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPaymentMethod) {
            throw new NotFoundException(`PaymentMethod with ID ${id} not found`);
        }
        return updatedPaymentMethod;
    }

    async deletePaymentMethod(id: string): Promise<boolean> {
        const deletedPaymentMethod = await this.PaymentMethodModel.findByIdAndDelete(id);
        if (!deletedPaymentMethod) {
            throw new NotFoundException(`PaymentMethod with ID ${id} not found`);
        }
        return !!deletedPaymentMethod;
    }
}
