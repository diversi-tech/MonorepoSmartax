import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { Client } from './client.model';
import { User } from './user.model';
import { DocType } from './docType.model';

@Schema()
export class Docs extends Document {
    @Prop({ type: String, required: true })
    _id: string;
    @Prop()
    name: string;


    @Prop()
    viewLink: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop()
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userUploaded: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DocType'})
    DocType: DocType;
    @Prop()
    status: string;

}

export const DocumentsModel = SchemaFactory.createForClass(Docs);
