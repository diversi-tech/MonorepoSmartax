import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Field extends Document {
    @Prop()
    key: string;
    
    @Prop()
    type:string;
    
}

export const FieldModell = SchemaFactory.createForClass(Field);
