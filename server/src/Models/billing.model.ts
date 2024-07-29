import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { User } from '../Models/user.model';
import { PaymentMethod } from './paymentMethod.model';
//add Malka comment git merge
@Schema()
export class Billing extends Document {

    @Prop()
    date: Date;

    @Prop()
    amount: number;

    @Prop()
    paymentMethod: PaymentMethod;

    @Prop()
    ifRreturn: boolean;

    @Prop()
    assignedTo: User;
}

export const BillingModel = SchemaFactory.createForClass(Billing);

