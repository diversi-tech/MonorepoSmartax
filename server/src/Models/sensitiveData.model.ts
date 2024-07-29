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
    toJSON: { getters: true },

  })
  a: string;

  @Prop({ required: false })
  b: string;

  @Prop({
    required: false,
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
    toJSON: { getters: true },
  })
  c: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value) => decrypt(value),
    toJSON: { getters: true },

  })
  d: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
    toJSON: { getters: true },

  })
  e: string;

  @Prop({
    set: (value: string) => encrypt(value),
    get: (value: string) => decrypt(value),
    toJSON: { getters: true },

  })
  f: string;

  @Prop({ required: true })
  isExist: boolean;
}

export const SensitiveDataModel = SchemaFactory.createForClass(SensitiveData);
