import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Field } from './field.model';

@Schema()
export class ClientType extends Document {
    @Prop()
    name: string;
    
    @Prop({ type: [Types.ObjectId], ref: 'repeatable' })
    tasks: Types.ObjectId[];

    @Prop({type:Array<Field>})
    fields:Field[];


}

export const ClientTypeModel = SchemaFactory.createForClass(ClientType);
