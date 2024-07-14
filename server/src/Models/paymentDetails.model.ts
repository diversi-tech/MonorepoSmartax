import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class PaymentDetails extends Document {
    @Prop()
    sumForMonth: number;

    @Prop({ default: () => new Date() })
    dateStart: Date;

    @Prop({ default: () => new Date() })
    dateFinish: Date;

    @Prop()
    description?: string;
}

export const PaymentDetailsModel = SchemaFactory.createForClass(PaymentDetails);
