import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';
import { Tag } from './tag.model';
import { Priority } from './priority.model';
import { Status } from './status.model';
import { CheckList } from './checkList.model';

@Schema()
export class Task extends Document {
    @Prop()
    parent: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop()
    taskName: string;

    @Prop()
    description: string;
    @Prop()
    dueDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    deadline: Date;

    @Prop({ type: Types.ObjectId, ref: 'Status'})
    status: Status;

    @Prop({ type: Types.ObjectId, ref: 'User'})
    assignedTo: User[];

    @Prop({ type: Types.ObjectId, ref: 'Tag'})
    tags: Tag[];

    @Prop({ type: Types.ObjectId, ref: 'Priority'})
    priority: Priority;

    @Prop()
    images: string[];

    @Prop() 
    subTasks: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CheckList' }] })
    checkList: CheckList[];

    @Prop()
    googleId: string;
}

export const TaskModel = SchemaFactory.createForClass(Task);