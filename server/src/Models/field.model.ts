import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Field extends Document {
    @Prop()
    key: string;
    
    @Prop()
    type_:string;
}

export const FieldModell = SchemaFactory.createForClass(Field);
