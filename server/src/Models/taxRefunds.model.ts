import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { StepField } from './stepField.model';
import { Status } from "./status.model";

@Schema()
export class TaxRefunds extends Document {
    
    @Prop()
    idClient: string;

    @Prop()
    idEmploye: string;

    @Prop()
    year:string

    @Prop()
    date: Date;

    @Prop([StepField])
    stepsList: StepField[]
   
    @Prop()
    status: Status[];
   

    @Prop()
    assignee: string[];
    

    @Prop()
    price: number;

    @Prop()
    paymentAmountPaid: number;

    @Prop()
    balanceDue: number;

    @Prop()
    entityType: string;
   
}

export const taxRefundsModel = SchemaFactory.createForClass(TaxRefunds);
