import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

    constructor(
        @InjectModel('Payment') private readonly PaymentModel: Model<Payment>,
        private billingService: BillingsService, private PaymentDetailsService: PaymentDetailsService
    ) { }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { mainPaymentDetails, morePaymentDetails, totalPayment, paymentMethod, paymentHistory, billingHistory } = createPaymentDto;
        if (!mainPaymentDetails || !paymentMethod) {
            throw new ValidationException('Missing required fields');
        }
        const createdPayment = new this.PaymentModel({ mainPaymentDetails, morePaymentDetails, totalPayment, paymentMethod, paymentHistory, billingHistory });
        return await createdPayment.save();
    }

    async getAllPayments(): Promise<Payment[]> {
        return await this.PaymentModel.find().exec();
    }

    async searchPayment(id: string): Promise<Payment[]> {
        const Payment = await this.PaymentModel.find({ "_id": id }).exec();
        if (!Payment || Payment.length === 0) {
            throw new NotFoundException('Payment not found');
        }
        return Payment;
    }

    async getPaymentById(id: string): Promise<Payment> {
        try {
            const Payment = await this.PaymentModel.findById(id).exec();
            if (!Payment) {
                throw new NotFoundException('Payment not found');
            }
            return Payment;
        } catch (err) {
            console.log(err);
        }
    }

    async updatePayment(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        const { _id, ...updateData } = updatePaymentDto;
        const updatedPayment = await this.PaymentModel.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedPayment) {
            throw new NotFoundException(`Payment with ID ${_id} not found`);
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

        const newBilling = await this.billingService.createBilling(billing);
        try {
            payment.billingHistory = payment.billingHistory.concat(newBilling);
            payment.totalPayment -= newBilling.amount;
            return payment.save();
        } catch (err) {
            console.log(err);
        }
    }


    async changePaymentDetails(paymentId: string, newPaymentDetails: CreatePaymentDetailsDto): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        // Add the current paymentDetails to paymentHistory
        const currentPaymentDetails = payment.mainPaymentDetails;
        try {
            payment.mainPaymentDetails = await this.PaymentDetailsService.createPaymentDetails(newPaymentDetails);
        } catch (err) {
            console.log(err);
        }
        if (currentPaymentDetails && currentPaymentDetails._id) {
            currentPaymentDetails.dateFinish = new Date();
            payment.paymentHistory = payment.paymentHistory.concat(currentPaymentDetails);
        }
        // Update the paymentDetails with the new data
        return payment.save();
    }

    async addMorePaymentDetails(paymentId: string, newPaymentDetails: CreatePaymentDetailsDto): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        const newMorePaymentDetails = await this.PaymentDetailsService.createPaymentDetails(newPaymentDetails);
        if (newMorePaymentDetails) {
            if (!payment.morePaymentDetails) {
                payment.morePaymentDetails = []
            }
            payment.morePaymentDetails.push(newMorePaymentDetails);
        }
        return payment.save();
    }

    async deleteOldPaymendDetails() {
        const allPayments = await this.getAllPayments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (const payment of allPayments) {
            const updatedMorePaymentDetails = payment.morePaymentDetails.filter((detail: PaymentDetails) => {
                if (detail.dateFinish && new Date(detail.dateFinish) < today) {
                    payment.paymentHistory.push(detail);
                    return false;
                }
                return true;
            });
            payment.morePaymentDetails = updatedMorePaymentDetails;
            await payment.save();
        }
    }

    async updateBillingStatus(paymentId: string, billingId: string, status: boolean): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        const billing = payment.billingHistory.find(b => b._id === billingId);
        if (!billing) {
            throw new NotFoundException('Billing not found');
        }
        await this.billingService.updateBillingStatus(billingId, status)
        if (status == false)
            payment.totalPayment -= billing.amount;
        else
            payment.totalPayment += billing.amount;
        return payment.save();
    }
}
