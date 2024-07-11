import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class PaymentMethod extends Document {
    @Prop()
    name: string;

    @Prop()
    color: string;
}

export const PaymentMethodModel = SchemaFactory.createForClass(PaymentMethod);