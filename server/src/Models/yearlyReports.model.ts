import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { stepFieldModel, StepField } from './stepField.model';

@Schema()
export class YearlyReport extends Document {
    
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

    // @Prop()
    // step1: Step1[];

    // @Prop()
    // step2: Step2[];

    // @Prop()
    // step3: Step3[];

    // @Prop()
    // step4: Step4[];

    // @Prop()
    // step5: Step5[];
    @Prop([StepField])
    stepsList: StepField[]
   
}

export const YearlyReportstModel = SchemaFactory.createForClass(YearlyReport);
