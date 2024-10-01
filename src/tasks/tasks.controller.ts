import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@Body() createTaskDto: { title: string; description: string; assignee: string; project: string }): Promise<Task> {
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.description, createTaskDto.assignee, createTaskDto.project);
    }

    // Additional endpoints can be added here
}
