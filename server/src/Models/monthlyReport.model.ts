import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MonthlyReport extends Document {
    
    @Prop()
    idUser: string;

    @Prop()
    idEmploye: string;

    @Prop()
    reportDate: Date;
}

export const MonthlyReportModel = SchemaFactory.createForClass(MonthlyReport);
