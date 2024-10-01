// project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

    async createProject(name: string, description: string): Promise<Project> {
        const project = new this.projectModel({ name, description });
        return project.save();
    }

    // Additional methods for project management can be added here
}
