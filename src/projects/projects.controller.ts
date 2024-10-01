import { Controller, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async create(@Body() createProjectDto: { name: string; description: string }): Promise<Project> {
        return this.projectsService.createProject(createProjectDto.name, createProjectDto.description);
    }

    // Additional endpoints can be added here
}
