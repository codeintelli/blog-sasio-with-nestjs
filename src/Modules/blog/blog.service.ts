import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { blogDocument } from 'src/Models/blog.schema';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';
import { AwsService } from 'src/common/services/aws.service';
import { BlogMetaDocument } from 'src/Models/blogMeta.schema';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<blogDocument>,
        @InjectModel('BlogMeta') private readonly blogMetaModel: Model<BlogMetaDocument>,
        private readonly message: ContextService,
        private readonly userService: UserService,
        private readonly awsService: AwsService,
    ) { }

    public async addBlog(userId, payload, folder, file) {
        await this.userService.doCheckUser(userId)
        payload.title = payload.title.toLowerCase();
        let saveBlog = new this.blogModel(payload);
        let storeResult = await saveBlog.save();

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
            saveBlogMeta.blog = storeResult;
            let storedData = await saveBlogMeta.save()
            // return storedData;
        }
        return storeResult
    }
}
