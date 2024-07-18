import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { CheckListItem } from './checkListItem.model';

@Schema()
export class CheckList extends Document {
    @Prop()
    name: string;

    @Prop({ type: [{ type:CheckListItem, ref: 'CheckListItem' }] })
    items: CheckListItem[];
}

export const CheckListModel = SchemaFactory.createForClass(CheckList);