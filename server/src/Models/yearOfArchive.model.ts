import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class YearOfArchive extends Document{
 @Prop()
 YearNum:string;
 @Prop()
 data:[{}];
}
export const YearOfArchiveModel = SchemaFactory.createForClass(YearOfArchive)


