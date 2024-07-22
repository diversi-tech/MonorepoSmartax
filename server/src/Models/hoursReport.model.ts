import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, Types } from 'mongoose';

@Schema()
export class HoursReport extends Document {

    @Prop()
    userId
   @Prop()
   date:Date;
   @Prop()
   enterTime
   @Prop()
   leaveTime
   @Prop()
   allHour

}

export const HoursReportModel = SchemaFactory.createForClass(HoursReport);
