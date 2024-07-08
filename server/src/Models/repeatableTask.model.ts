import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Client } from "./client.model";
import { Status } from "./status.model";
import { User } from "./user.model";
import { Tag } from "./tag.model";
import { Priority } from "./priority.model";

@Schema()
export class repeatableTask extends Document {
    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
    client: Client;

    @Prop()
    taskName: string;

    @Prop()
    description: string;
    @Prop()
    dueDate: Date;


    @Prop()
    status: Status;

    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    assignedTo: User;

    @Prop()//{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
    tags:Tag[];

    @Prop()
    priority: Priority;

   
}

export const TaskModel = SchemaFactory.createForClass(repeatableTask);
