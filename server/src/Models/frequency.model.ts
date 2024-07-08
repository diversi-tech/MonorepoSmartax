import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class frequency extends Document {
    @Prop()
    name: string;

    @Prop()
    color: string;
}

export const frequencyModel = SchemaFactory.createForClass(frequency);