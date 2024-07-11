import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the schema and model
@Schema()
export class SensitiveData extends Document {
  @Prop({ required: true, unique: true, auto: true })
  number: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  clientId: string;

  @Prop()
  bankDetail: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  creditCardCNumber: string;

  @Prop()
  creditCardCValidity: string;

  @Prop()
  digitsOnTheBack: string;

  @Prop({ required: true })
  isCreditCard: boolean;
}

// Create the Mongoose model
export const SensitiveDataSchema = SchemaFactory.createForClass(SensitiveData);