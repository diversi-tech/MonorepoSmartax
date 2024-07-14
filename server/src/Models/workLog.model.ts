import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkLogDocument = WorkLog & Document;

@Schema()
export class WorkLog {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  date: Date;  // שדה לתאריך

  @Prop({ required: true })
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  hoursWorked: number;


  @Prop()
  overtimeHours: number; 

  @Prop()
  overtimeHours150: number;
   
}

export const WorkLogModel = SchemaFactory.createForClass(WorkLog);
