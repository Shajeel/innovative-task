import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { Task, TaskSchema } from './task.schema';
import { Project, ProjectSchema } from '../projects/project.schema';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    ],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule {}
