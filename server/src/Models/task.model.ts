import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from './client.model';
// import { User } from './user.model';

@Schema()
export class Task extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop()
    taskName: string;

    @Prop()
    description: string;
    @Prop()
    dueDate: Date;

    @Prop()
    status: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    // assignedTo: User;
}

export const TaskModel = SchemaFactory.createForClass(Task);
