import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Field } from './field.model';

@Schema()
export class ClientField extends Document {
    @Prop()
    _id: string
    
    @Prop()
    field: Field;
    
    @Prop()
    value: string;

}

export const ClientFieldModel = SchemaFactory.createForClass(ClientField);
