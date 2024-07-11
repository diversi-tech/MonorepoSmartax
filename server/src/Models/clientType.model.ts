import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from './task.model';
import { Field } from 'multer';

@Schema()
export class ClientType extends Document {
    @Prop()
    name: string;

    @Prop({ type: Array<String>})
    tasks: Array<String>;

    @Prop({ type: Array<String>  })
    fields: Array<String>;


}

export const ClientTypeModel = SchemaFactory.createForClass(ClientType);
