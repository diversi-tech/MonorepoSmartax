import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Year extends Document{
    @Prop({
        required: true,
        validate: {
          validator: function(v: string) {
            const currentYear = new Date().getFullYear();
            return /^\d{4}$/.test(v) && parseInt(v) <= currentYear;
          },
          message: (props: any) => `${props.value} is not a valid year! Year must be a 4-digit number and less than or equal to the current year.`
        }
      })
      yearNUm: string;
}

export const YearModel= SchemaFactory.createForClass(Year);