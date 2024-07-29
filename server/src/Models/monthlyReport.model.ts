import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { stepFieldModel } from './stepField.model';
import { StepFieldMonth } from './stepFieldMonth.model';

@Schema()
export class MonthlyReport extends Document {
    
    @Prop()
    idUser: string;

    @Prop()
    idEmploye: string;

    @Prop()
    reportDate: Date;

    @Prop([StepFieldMonth])
    monthlyReportFields: StepFieldMonth[];
}

export const MonthlyReportModel = SchemaFactory.createForClass(MonthlyReport);
