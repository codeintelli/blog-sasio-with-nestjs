import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './blog.schema';
import { User } from './user.schema';
export type BlogMetaDocument = BlogMeta & Document;

@Schema()
class Front {
    @Prop()
    url: string;

    @Prop()
    location: string;

    @Prop()
    fileType: string;

    @Prop()
    key: string;

    @Prop()
    filename: string;

    @Prop()
    size: string;
}

@Schema()
class BackGround {
    @Prop()
    url: string;

    @Prop()
    location: string;

    @Prop()
    fileType: string;

    @Prop()
    key: string;

    @Prop()
    filename: string;

    @Prop()
    size: string;

}

@Schema({ timestamps: true })
export class BlogMeta {

    @Prop(type => Front)
    frontImage: Front

    @Prop(type => BackGround)
    bannerImage: BackGround

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
    blog: Blog;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ default: false })
    isDeleted: boolean;
}


export const BlogMetaSchema = SchemaFactory.createForClass(BlogMeta);