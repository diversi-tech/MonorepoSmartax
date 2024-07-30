import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from './status.model';
import mongoose, { Document, Types } from 'mongoose';
import { Client } from './client.model';
import { Year } from './year.model';
import { StepField } from './stepField.model';
import { User } from './user.model';

@Schema()
export class FinancialStatement extends Document {
    @Prop()
    isInterested: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    assignee: User[];

    @Prop({ type: Types.ObjectId, ref: 'User'})
    lastEmployeeWhoTreated: User;

    @Prop({ type: Types.ObjectId, ref: 'Year'})
    year: Year;

    @Prop()
    date: Date;

    @Prop()
    price: number;

    @Prop()
    paymentAmountPaid: number;

    @Prop()
    balanceDue: number;

    @Prop()
    entityType: string;

    @Prop([StepField])
    stepsList: StepField[]

    @Prop({ type: Types.ObjectId, ref: 'Status'})
    status: Status;

    @Prop()
    followUp: [dateTime: Date, comment: string];

    @Prop()
    finalSubmissionDate: Date;
}

export const FinancialStatementModel = SchemaFactory.createForClass(FinancialStatement);