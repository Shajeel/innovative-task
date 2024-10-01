import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {Project} from "../projects/project.schema";
import {Task} from "../tasks/task.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: ['admin', 'user'], default: 'user' })
    role: string;

    @Prop({ type: [Project], default: [] })
    projects: Project[];

    @Prop({ type: [{ type: String, ref: 'Task' }] })
    tasks: Task[];

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
