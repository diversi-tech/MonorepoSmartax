import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../Models/role.modle';
import { Client } from './client.model';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    userName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
    role: Role;
    @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
    favoritesClient: string[];
}

export const UserModel = SchemaFactory.createForClass(User);
