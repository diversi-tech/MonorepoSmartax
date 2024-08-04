import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

    @Prop()
    googleId: string;
}

export const MeetModel = SchemaFactory.createForClass(Meet);