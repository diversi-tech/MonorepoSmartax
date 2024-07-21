import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Year extends Document{
    @Prop()
      yearNUm: string;
}

export const YearModel= SchemaFactory.createForClass(Year);