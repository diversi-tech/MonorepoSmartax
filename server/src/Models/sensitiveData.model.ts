import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { decrypt, encrypt } from '../services/encrypt.service';

@Schema()
export class SensitiveData extends Document {
  @Prop({ required: true, unique: true, auto: true })
  number: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
  })
  bankDetail: string;

  @Prop({ required: true })
  userName: string;

  @Prop({
    required: true,
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
    toJSON: { getters: true },
  })
  password: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value) => decrypt(value),
  })
  creditCardCNumber: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
  })
  creditCardCValidity: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
  })
  digitsOnTheBack: string;

  @Prop({ required: true })
  isCreditCard: boolean;
}

export const SensitiveDataModel = SchemaFactory.createForClass(SensitiveData);
