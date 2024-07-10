import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Field } from './field.model';

@Schema()
export class ClientType extends Document {
    @Prop()
    name: string;
    
    @Prop()
    tasks:string[];
    
    @Prop({type:Array<Field>})
    fields:Field[];

   
}

export const ClientTypeModel = SchemaFactory.createForClass(ClientType);
