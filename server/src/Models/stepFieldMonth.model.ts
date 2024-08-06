import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StepFieldMonth extends Document {
    
    @Prop()
    value: string;

    @Prop({ default: false })
    content: string;

    @Prop()
    type: string;


}

export const stepFieldMonthModel = SchemaFactory.createForClass(StepFieldMonth);
