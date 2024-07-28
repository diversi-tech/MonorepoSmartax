import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types} from "mongoose";
import { PaymentMethod } from "./paymentMethod.model";
import { PaymentDetails } from "./paymentDetails.model";
import { Billing } from "./billing.model";

@Schema()
export class Payment extends Document {
    @Prop({ type: PaymentDetails })
    mainPaymentDetails: PaymentDetails;

    @Prop()
    morePaymentDetails: PaymentDetails[];

    @Prop()
    totalPayment: number;
    

    @Prop({ type: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Prop({ type: Types.ObjectId, ref: 'PaymentDetails' })
    paymentHistory: PaymentDetails[];

    @Prop({ type: Types.ObjectId, ref: 'Billing' })
    billingHistory: Billing[];
}

export const PaymentModel = SchemaFactory.createForClass(Payment);
