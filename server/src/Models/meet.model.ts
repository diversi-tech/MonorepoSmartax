import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
// import { User } from '../Models/user.model';

@Schema()
export class Meet extends Document {
    @Prop()
    address: string;

    @Prop()
    date:Date;

    @Prop()
    beginningTime:Date;

    @Prop()
    endTime:Date;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    usersId: Types.ObjectId[];

    @Prop({ type: [Types.ObjectId], ref: 'Client' })
    clientDepartments: Types.ObjectId[];
}

export const MeetModel = SchemaFactory.createForClass(Meet);