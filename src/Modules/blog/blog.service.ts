import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { blogDocument } from 'src/Models/blog.schema';
import { ContextService } from 'src/common/services/context.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<blogDocument>,
        private readonly message: ContextService,
    ) { }

    public async addBlog(userId) {

    }
}
