import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Client } from './client.model';


@Schema()
export class CommunicationArchive extends Document {
    
    @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
    client: Client;

    @Prop({ type: Date })
    date: Date;

    @Prop({ type: String })
    type: string;

    @Prop({ type: String })
    summary: string;

    @Prop({type: Boolean} )
    isDeleted: Boolean;

    @Prop({ type: Date })
    deletedDate: Date;
    
}


export const communicationArchiveModel = SchemaFactory.createForClass(CommunicationArchive);