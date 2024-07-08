import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';

@Schema()
export class Documents extends Document {
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    fileId: Types.ObjectId;
    
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
    @Prop()
    status: string;

}

export const DocumentsModel = SchemaFactory.createForClass(Documents);
