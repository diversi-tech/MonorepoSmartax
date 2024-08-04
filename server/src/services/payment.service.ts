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
import { ObjectId } from "typeorm";




@Injectable()
export class PaymentService {

    constructor(@InjectModel('Payment') private readonly PaymentModel: Model<Payment>, private billingService: BillingsService, private paymentDetailsService: PaymentDetailsService) { }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        console.log('start create payment');

        const { mainPaymentDetails, morePaymentDetails, totalPayment, paymentMethod, paymentHistory, billingHistory } = createPaymentDto;
        console.log(mainPaymentDetails, morePaymentDetails, totalPayment, paymentMethod, paymentHistory, billingHistory);

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
        console.log('start update');

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
            console.log(newBilling);
            console.log(payment.billingHistory.length);


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
        console.log("currentPaymentDetails: " + currentPaymentDetails);
        try {
            payment.mainPaymentDetails = await this.paymentDetailsService.createPaymentDetails(newPaymentDetails);
            console.log("payment.mainPaymentDetails: " + payment.mainPaymentDetails);
        } catch (err) {
            console.log(err);
        }
        if (currentPaymentDetails && currentPaymentDetails._id) {
            currentPaymentDetails.dateFinish = new Date();
            console.log("currentPaymentDetails.dateFinish: " + currentPaymentDetails.dateFinish);
            payment.paymentHistory = payment.paymentHistory.concat(currentPaymentDetails);
            console.log("payment.paymentHistory: " + payment.paymentHistory);

        }
        // Update the paymentDetails with the new data
        return payment.save();
    }

    async addMorePaymentDetails(paymentId: string, newPaymentDetails: CreatePaymentDetailsDto): Promise<Payment> {
        console.log(newPaymentDetails);

        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        console.log('payment found');
        console.log(payment);


        const newMorePaymentDetails = await this.paymentDetailsService.createPaymentDetails(newPaymentDetails);
        if (newMorePaymentDetails) {
            console.log('payment created');
            if (!payment.morePaymentDetails) {
                payment.morePaymentDetails = []
                console.log(payment.morePaymentDetails);

            }
            payment.morePaymentDetails.push(newMorePaymentDetails);
            console.log('payment pushed');

        }
        console.log(payment.morePaymentDetails);

        return payment.save();
    }

    async deleteOldPaymendDetails() {
        const allPayments = await this.getAllPayments();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // לאפס את השעה כדי להתייחס רק לתאריך

        for (const payment of allPayments) {
            const updatedMorePaymentDetails = payment.morePaymentDetails.filter((detail: PaymentDetails) => {
                if (detail.dateFinish && new Date(detail.dateFinish) < today) {
                    payment.paymentHistory.push(detail);
                    return false; // מסיר מהמערך
                }
                return true; // שומר במערך
            });

            payment.morePaymentDetails = updatedMorePaymentDetails;
            await payment.save();
        }

    }

    async updateBillingStatus(paymentId: string, billingId: string, status: boolean): Promise<Payment> {
       try{ const payment = await this.PaymentModel.findById(paymentId);
        console.log("payment found ");

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        const billing = await this.billingService.getBillingById(billingId);
        //const billing = payment.billingHistory.find(b => b.id === billingId);
        console.log("billing found ");


        if (!billing) {
            console.log("sssssssssssssss billing not found");

            throw new NotFoundException('Billing not found');
        }
        try {
            const i = payment.billingHistory.findIndex(b=> billing._id === b._id);

            payment.billingHistory[i]=await this.billingService.updateBillingStatus(billingId, status)
            if (status == false)
                payment.totalPayment -= billing.amount;
            else
                payment.totalPayment += billing.amount;
            console.log("ccc");
            console.log(payment.billingHistory[i]);
            

             payment.save();
             console.log("---------------------------------");
             
console.log(payment.billingHistory[i]);
return payment

        }
        catch (err) {
            console.log("failed");

            console.log(err);
        }
        finally {
            console.log("v");
        }}catch(err){
            console.log(err);
            
        }
    }

    async stopPaymentDetails(paymentId: string, paymentDetailsId: string): Promise<Payment> {
        const payment = await this.PaymentModel.findById(paymentId);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        const paymentDetails = await this.paymentDetailsService.getPaymentDetailsById(paymentDetailsId);
        if (!paymentDetails) {
            throw new NotFoundException('Payment details not found');
        }

        if (paymentDetails && paymentDetails._id) {
            paymentDetails.dateFinish = new Date();
            console.log("currentPaymentDetails.dateFinish: " + paymentDetails.dateFinish);
            payment.paymentHistory = payment.paymentHistory.concat(paymentDetails);
            console.log("payment.paymentHistory: " + payment.paymentHistory);

        }

        if (!Array.isArray(payment.morePaymentDetails)) {
            payment.morePaymentDetails = [];
        }
        payment.morePaymentDetails = payment.morePaymentDetails.filter(detail => detail._id.toString() !== paymentDetailsId);



        return payment.save();
    }




}
