import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PaymentMethod } from "./paymentMethod.model";
import { Billing } from "./billing.model";
import { PaymentDetails } from "./paymentDetails.model";

@Schema()
export class Payment extends Document {
    @Prop({ type: PaymentDetails })
    paymentDetails: PaymentDetails;

    @Prop()
    totalPayment: number;

    @Prop({ type: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'PaymentDetails' }] })
    paymentHistory: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Billing' }] })
    billingHistory: Types.ObjectId[];
}

export const PaymentModel = SchemaFactory.createForClass(Payment);
