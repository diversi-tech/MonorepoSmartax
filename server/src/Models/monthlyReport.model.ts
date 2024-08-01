import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { stepFieldModel } from './stepField.model';
import { StepFieldMonth } from './stepFieldMonth.model';
import { Status } from './status.model';

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
    
    @Prop()
    status: Status[];
}

export const MonthlyReportModel = SchemaFactory.createForClass(MonthlyReport);
