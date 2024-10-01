import { Body, Controller, Delete, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';
import {Public} from "../auth/decorators/public.decorator";
import {Roles} from "../common/decorators/roles.decorator";
import {RolesGuard} from "../common/guards/roles.guard";

@UseGuards(RolesGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @Roles(['admin', 'user'])
  async create(@Body() createBlogDto: CreateBlogDto) {
    await this.blogsService.create(createBlogDto);
  }

  @Get()
  @Public()
  async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('filter') filter: string, // Accept filter as a query parameter
      @Query('sort') sort: string // Accept sort as a query parameter
  ): Promise<{ data: Blog[]; total: number }> {
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedSort = sort ? JSON.parse(sort) : {};
    return this.blogsService.findAll(page, limit, parsedFilter, parsedSort);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin', 'user'])
  async delete(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}

