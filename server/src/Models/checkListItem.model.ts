import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class CheckListItem extends Document {
    @Prop({type:String})
    _id:string

    @Prop({type:String})
    description: string;

    @Prop({type:Boolean})
    isDone: boolean;
}


export const CheckListItemModel = SchemaFactory.createForClass(CheckListItem);