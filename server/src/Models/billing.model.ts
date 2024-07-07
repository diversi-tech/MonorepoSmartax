import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BillingStatus } from './billingStatus.model';
import { Client } from './client.model';
import { User } from '../Models/user.model';
//add Malka comment git merge
@Schema()
export class Billing extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Client' , required: true})
    client: Client;

    @Prop()
    amount: string;

    @Prop({ type: Types.ObjectId, ref: 'BillingStatus' })
    status: Types.ObjectId;

    @Prop()
    dueDate: Date;

    @Prop()
    paidDate: Date;

    @Prop({ type: Types.ObjectId, ref: 'User'  ,required: true})
    assignedTo: User;
}

export const BillingModel = SchemaFactory.createForClass(Billing);

