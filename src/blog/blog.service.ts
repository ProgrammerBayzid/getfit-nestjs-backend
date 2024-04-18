import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import mongoose from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { BlogQuery } from './blogQuery/blogQuery';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
    @InjectModel(Doctor.name)
    private doctorModel: mongoose.Model<Doctor>,
  ) {}

  async create(userId: string, createBlogDto: CreateBlogDto): Promise<Blog> {

    const createBlog = new this.blogModel({
      ...createBlogDto,
      doctorId: userId,
    });
    await createBlog.save();
    return createBlog;
  }

  async findAll(queryOptions?: BlogQuery): Promise<Blog[]> {
    try {
      let query = this.blogModel.find();

      if (queryOptions?.category) {
        query = query.where('category').equals(queryOptions.category);
      }
      if (queryOptions?.planId) {
        query = query.where('plan').equals(queryOptions.planId);
      }

      // Pagination
      const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
      query = query.skip(startIndex).limit(queryOptions?.limit);
      // Sorting
      if (queryOptions?.sortBy && queryOptions?.sortOrder) {
        const sortDirection = queryOptions.sortOrder === 'desc' ? -1 : 1;
        query = query.sort({ [queryOptions.sortBy]: sortDirection });
      }

      const getBlog = await query.exec();
      return getBlog;
    } catch (error) {
      // Handle any errors
      console.error('Error in findAll:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async findMyBlog(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    return blog;
  }

  async findById(id: string): Promise<Blog> {
    const getSingleDoctorBlog = await this.blogModel.findById(id);
    if (!getSingleDoctorBlog) {
      throw new NotFoundException('blog not found');
    }
    return getSingleDoctorBlog;
  }

  async updateById(id: string, updateBlog: UpdateBlogDto): Promise<Blog> {
    return await this.blogModel.findByIdAndUpdate(id, updateBlog, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Blog> {
    try {
      return await this.blogModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException('Error deleting Doctor');
    }
  }
}
