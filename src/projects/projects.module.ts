import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  providers: [ProjectsService],
  exports: [ProjectsService],
  controllers: [ProjectsController], // Exporting ProjectService
})
export class ProjectsModule {}
