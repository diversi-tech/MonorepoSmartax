import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { stepFieldModel } from './stepField.model';
import { StepFieldMonth, stepFieldMonthModel } from './stepFieldMonth.model';
import { Status } from './status.model';

@Schema()
export class MonthlyReport extends Document {
    
    @Prop()
    idUser: string;

    @Prop()
    idEmploye: string;

    @Prop()
    reportDate: Date;

    @Prop({type: Map, of: [{ type: stepFieldMonthModel }] })
    monthlyReportFields: Map<string, Types.Array<StepFieldMonth>>;
    
    @Prop()
    status: Status[];
}

export const MonthlyReportModel = SchemaFactory.createForClass(MonthlyReport);
