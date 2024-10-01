import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = new this.projectModel(createProjectDto);
        return newProject.save();
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }
}
