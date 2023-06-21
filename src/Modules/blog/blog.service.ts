import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { blogDocument } from 'src/Models/blog.schema';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';
import { AwsService } from 'src/common/services/aws.service';
import { BlogMetaDocument } from 'src/Models/blogMeta.schema';
import { blogCommentDocument } from 'src/Models/blogComment.schema';
import { Blog } from '../../Models/blog.schema';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<blogDocument>,
        @InjectModel('BlogMeta') private readonly blogMetaModel: Model<BlogMetaDocument>,
        @InjectModel('BlogComment') private readonly blogCommentModel: Model<blogCommentDocument>,
        private readonly message: ContextService,
        private readonly userService: UserService,
        private readonly awsService: AwsService,
    ) { }

    public async addBlog(userId, payload, folder, file) {
        await this.userService.doCheckUser(userId)
        payload.title = payload.title.toLowerCase();
        let saveBlog = new this.blogModel(payload);
        let blog = await saveBlog.save();
        let frontBlogImage;
        if (file) {
            let result = await this.awsService.uploadFile(folder, userId, file);

            let saveBlogMeta = new this.blogMetaModel()

            saveBlogMeta.frontImage = {
                filename: file.originalname,
                fileType: file.mimetype,
                size: file.size,
                location: result.Bucket,
                key: result.Key,
                url: result.Location,
            }
            saveBlogMeta.user = userId;
            saveBlogMeta.blog = blog;
            frontBlogImage = await saveBlogMeta.save();
        }
        return { blog, frontBlogImage }
    }

    public async updateBlog(userId, reqBody) {
        await this.userService.doCheckUser(userId);
        let editResult = await this.blogModel.findByIdAndUpdate(reqBody.blogId, reqBody, { new: true });
        return editResult;
    }

    public async deleteBlog(userId, reqBody) {
        await this.userService.doCheckUser(userId);
        await this.blogModel.findByIdAndUpdate(reqBody.blogId, { isActive: false }, { new: true });
        return true;
    }

    public async removeBlog(userId, param) {
        await this.userService.doCheckUser(userId);
        await this.blogModel.findByIdAndDelete(param);
        return true;
    }

    public async listBlog() {
        let getResult = await this.blogModel.find({ isActive: true }).sort('desc');
        return getResult;
    }

    public async singleBlog(userId, param) {
        await this.userService.doCheckUser(userId);
        let getBlogData = await this.blogModel.findById(param);
        return getBlogData;
    }

    public async toggleBlogStatus(userId, status, param) {
        await this.userService.doCheckUser(userId);
        let data = await this.blogModel.findByIdAndUpdate(param, status, { new: true });
        return data;
    }

    public async addBlogComment(userId, payload) {
        await this.userService.doCheckUser(userId);
        let comment = await new this.blogCommentModel(payload);
        comment.blog = payload.blog
        comment.user = userId;
        let result = await comment.save()
        return result;
    }

    public async getBlogComment(userId, Param) {
        await this.userService.doCheckUser(userId);
        let result = await this.blogCommentModel.find({ where: { blog: Param } }).sort('desc')
        return result
    }
}
