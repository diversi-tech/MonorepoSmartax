import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Frequency } from "./frequency.model";

@Schema()
export class PaymentDetails extends Document {
    @Prop()
    sumForMonth: number;

    @Prop()
    maxHours: number;

    @Prop()
    frequency: Frequency;

    @Prop({ default: () => new Date() })
    dateStart: Date;

    @Prop({ default: () => new Date() })
    dateFinish: Date;

    @Prop()
    description?: string;
}

export const PaymentDetailsModel = SchemaFactory.createForClass(PaymentDetails);
