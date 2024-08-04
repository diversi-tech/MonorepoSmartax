import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { stepFieldModel, StepField } from './stepField.model';
import { Status } from './status.model';

@Schema()
export class YearlyReport extends Document {
    
    @Prop()
    idClient: string;

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

    @Prop()
    entityType: string;

    
    @Prop([StepField])
    stepsList: StepField[]

    @Prop()
    status: Status;
   
}

export const YearlyReportstModel = SchemaFactory.createForClass(YearlyReport);
