import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkLogDocument = WorkLog & Document;

@Schema()
export class TimeEntry {
  @Prop({ type: String, auto: true })
  _id: string;

  @Prop({ required: true })
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  hoursWorked: number;
}

const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);

@Schema()
export class WorkLog {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [TimeEntrySchema], default: [] })
  timeEntries: TimeEntry[];

  @Prop()
  allhoursWorked: number;
}

export const WorkLogModel = SchemaFactory.createForClass(WorkLog);
