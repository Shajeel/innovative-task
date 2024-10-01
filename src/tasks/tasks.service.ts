import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async createTask(title: string, description: string, assignee: string, project: string): Promise<Task> {
        const task = new this.taskModel({ title, description, assignee, project });
        return task.save();
    }

    // Additional methods for task management can be added here
}
