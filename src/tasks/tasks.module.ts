import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { Task, TaskSchema } from './task.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
    exports: [MongooseModule],
})
export class TasksModule {}
