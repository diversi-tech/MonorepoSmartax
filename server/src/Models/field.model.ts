import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Field extends Document {
    @Prop()
    key: string;
    
    // @Prop({type:String})
    @Prop()
    type_:string;
    
}

export const FieldModell = SchemaFactory.createForClass(Field);
