import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class FieldsTC extends Document {
    @Prop()
    key: string;
    
    @Prop()
    type:string;
    
}

export const FieldsTCModell = SchemaFactory.createForClass(FieldsTC);
