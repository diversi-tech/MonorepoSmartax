import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FieldsTC } from './fieldsCT.model';

@Schema()
export class ClientType extends Document {
    @Prop()
    name: string;
    
    @Prop()
    tasks:string[];
    
    @Prop({type:Array<FieldsTC>})
    fields:FieldsTC[];

   
}

export const ClientTypeModel = SchemaFactory.createForClass(ClientType);
