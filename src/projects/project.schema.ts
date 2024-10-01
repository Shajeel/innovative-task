// project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { Task } from '../tasks/task.schema';

@Schema()
export class Project extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: String, ref: 'User' }] })
    members: User[];

    @Prop({ type: [{ type: String, ref: 'Task' }] })
    tasks: Task[];

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
