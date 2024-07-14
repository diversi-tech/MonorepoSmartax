import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
@Schema()
export class Timer extends Document{
    @Prop({type: Types.ObjectId, ref: 'Task', required: true })
    taskId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop()
    start: Date;

    @Prop()
    end: Date;
}

export const TimerModel = SchemaFactory.createForClass(Timer);