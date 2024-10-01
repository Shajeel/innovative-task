import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog, BlogSchema } from './schemas/blog.schema';
import {PaginationService} from "../common/pagination.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService, PaginationService],
})
export class BlogsModule {}
