import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    status: string; // e.g., 'pending', 'in-progress', 'completed'

    @Prop({ required: true, type: String, ref: 'Project' })
    project: string;

    @Prop({ required: true, type: String, ref: 'User' })
    assignedTo: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
