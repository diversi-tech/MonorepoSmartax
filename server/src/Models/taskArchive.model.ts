import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Client } from './client.model';
import { User } from '../Models/user.model';
import { Tag } from './tag.model';
import { Priority } from './priority.model';
import { Status } from './status.model';
import { CheckList } from './checkList.model';

@Schema()
export class TaskArchive extends Document {
     

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

    @Prop()
    status: Status;

    @Prop()
    assignedTo: User[];

    @Prop({ type: [{ type: Tag }] })
    tags: Tag[];

    @Prop()
    priority: Priority;

    @Prop()
    images: string[];


    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CheckList' }] })
    checkList: CheckList[];

    @Prop()
    googleId: string;

//added variables
    
    @Prop({ type: Date })
    storeDate: Date;

    @Prop({type: Boolean} )
    isDeleted: Boolean;

    @Prop({ type: Date })
    deletedDate: Date;
    
}


export const taskArchiveModel = SchemaFactory.createForClass(TaskArchive);