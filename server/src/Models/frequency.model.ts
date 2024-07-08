import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Frequency extends Document {
    @Prop()
    name: string;

    @Prop()
    color: string;
}

export const frequencyModel = SchemaFactory.createForClass(Frequency);