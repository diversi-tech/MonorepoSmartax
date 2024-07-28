import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { StepField } from './stepField.model';

@Schema()
export class TaxRefunds extends Document {
    
    @Prop()
    idUser: string;

    @Prop()
    idEmploye: string;

    @Prop()
    year:string

    @Prop()
    date: Date;

    @Prop([StepField])
    stepsList: StepField[]
   
}

export const taxRefundsModel = SchemaFactory.createForClass(TaxRefunds);
