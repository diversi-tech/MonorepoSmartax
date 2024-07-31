import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Task } from "./task.model";


@Schema()
export class YearArchive extends Document{
 @Prop()
 yearNum:string;
 @Prop({ type: [Task] })
 tasksData?:Task[];
}
export const YearArchiveModel = SchemaFactory.createForClass(YearArchive)


