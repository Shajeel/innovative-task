import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';

describe('BlogsController', () => {
  let blogsController: BlogsController;
  let blogsService: BlogsService;

  const mockCreateBlogDto: CreateBlogDto = {
    title: 'Test Blog Title',
    content: 'This is the content of the test blog.',
    author: 'Test Author',
  };

  const mockBlog: Blog = {
    title: 'Test Blog Title',
    content: 'This is the content of the test blog.',
    author: 'Test Author',
    createdAt: new Date()
  };

  const mockBlogsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: mockBlogsService,
        },
      ],
    }).compile();

    blogsController = module.get<BlogsController>(BlogsController);
    blogsService = module.get<BlogsService>(BlogsService);
  });

  describe('create', () => {
    it('should create a blog', async () => {
      await blogsController.create(mockCreateBlogDto);
      expect(blogsService.create).toHaveBeenCalledWith(mockCreateBlogDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of blogs', async () => {
      const result = [mockBlog];
      blogsService.findAll = jest.fn().mockResolvedValue({ data: result, total: result.length });

      const response = await blogsController.findAll(1, 10, '', '');
      expect(response).toEqual({ data: result, total: result.length });
      expect(blogsService.findAll).toHaveBeenCalledWith(1, 10, {}, {});
    });
  });

  describe('findOne', () => {
    it('should return a single blog', async () => {
      const blogId = '1';
      blogsService.findOne = jest.fn().mockResolvedValue(mockBlog);

      const response = await blogsController.findOne(blogId);
      expect(response).toEqual(mockBlog);
      expect(blogsService.findOne).toHaveBeenCalledWith(blogId);
    });
  });

  describe('delete', () => {
    it('should delete a blog', async () => {
      const blogId = '1';
      await blogsController.delete(blogId);
      expect(blogsService.delete).toHaveBeenCalledWith(blogId);
    });
  });
});
