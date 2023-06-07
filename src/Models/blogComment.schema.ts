import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import Roles from 'src/Modules/user/enum/role.enum';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Attachment } from './attachment.schema';
import { Blog } from './blog.schema';
import { User } from './user.schema';

export type blogCommentDocument = BlogComment & Document;
@Schema({ timestamps: true })
export class BlogComment {
    @Prop()
    comment: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
    blog: Blog;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ default: false })
    isDeleted: boolean;

}
export const BlogCommentSchema = SchemaFactory.createForClass(BlogComment);