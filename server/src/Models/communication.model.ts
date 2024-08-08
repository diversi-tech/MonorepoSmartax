// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';
// import { Client } from './client.model';
// import { User } from '../Models/user.model';

// @Schema()
// export class Communication extends Document {
//     @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
//     client: Client;

//     @Prop({ type: Date, required: true })
//     date: Date;

//     @Prop({ type: String, required: true })
//     Subject: string;

//     @Prop({ type: String, required: true })
//     summary: string;

//     @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//     assignedTo: User;

//     @Prop({ type: String, required: true })
//     Status: boolean;
// }

// export const communicationModel = SchemaFactory.createForClass(Communication);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type CommunicationDocument = Communication & Document;

@Schema()
export class Communication {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: String, ref: 'Client', required: true })
  client: string; // ObjectId as string

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  summary: string;

  @Prop({ type: String, required: true })
  assignedTo: string; // Store SelectItem's value (assumed to be string)

  @Prop({ type: Boolean, required: true })
  Status: boolean;

  @Prop({ type: String, required: true })
  Subject: string;
}

export const CommunicationSchema = SchemaFactory.createForClass(Communication);
