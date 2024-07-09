import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class callTopicSchema extends Document {
    @Prop()
    name: string;
}


export const callTopicSchemaModel = SchemaFactory.createForClass(callTopicSchema);