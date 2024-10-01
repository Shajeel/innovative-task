import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';
import {UpdateBlogDto} from "./dto/update-blog.dto";
import {PaginationService} from "../common/pagination.service";

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
              private readonly paginationService: PaginationService) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdPost = new this.blogModel(createBlogDto);
    return createdPost.save();
  }

  async findAll(page: number, limit: number, filter: any, sort: any): Promise<{ data: Blog[]; total: number }> {
    return this.paginationService.paginate(this.blogModel, page, limit, filter, sort);
  }

  async findOne(id: string): Promise<Blog> {
    const post = await this.blogModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const post = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async delete(id: string): Promise<Blog> {
    const post = await this.blogModel.findByIdAndDelete(id).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }
}
