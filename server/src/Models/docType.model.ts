import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DocType extends Document {

    @Prop({ type: String })
    name: string;
}
export const docTypeModel = SchemaFactory.createForClass(DocType);