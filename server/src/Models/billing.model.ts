import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from './client.model';
///add Malka comment git merge
@Schema()
export class Billing extends Document {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop()
    amount: string;

    @Prop()
    status: string;

    @Prop()
    dueDate: Date;

    @Prop()
    paidDate: Date;
}

export const BillingModel = SchemaFactory.createForClass(Billing);
