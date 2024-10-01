import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { Project } from '../projects/project.schema';

@Schema()
export class Task extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ required: true, type: String, ref: 'User' })
    assignee: User;

    @Prop({ required: true, type: String, ref: 'Project' })
    project: Project;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
