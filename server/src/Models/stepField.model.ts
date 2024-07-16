import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StepField extends Document {
    
    @Prop()
    value: string;

    @Prop({ default: false })
    isCompleted: boolean;

    @Prop({
        required: true,
        min: 1,
        max: 5,
        validate: {
          validator: (value: number) => Number.isInteger(value),
          message: 'Step number must be an integer'
    }})
    stepNumber: number;

    @Prop()
    type: string;


}

export const stepFieldModel = SchemaFactory.createForClass(StepField);
