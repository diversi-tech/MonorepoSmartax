import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class YearlyReports extends Document {
    @Prop()
    name: string;

    @Prop()
    idUser: string;

    @Prop()
    assignee: string[];
    
    @Prop()
    idEmploye: string;

    @Prop()
    yearReport: string;

    @Prop()
    dateTime: Date;

    @Prop()
    price: number;

    @Prop()
    paymentAmountPaid: number;

    @Prop()
    balanceDue: number;
   
}

export const YearlyReportstModel = SchemaFactory.createForClass(YearlyReports);
