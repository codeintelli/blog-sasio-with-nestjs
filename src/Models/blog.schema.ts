import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { BlogMeta } from './blogMeta.schema';

export type blogDocument = Blog & Document;
@Schema({ timestamps: true })
export class Blog {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    quotes: string;

    @Prop()
    tags: [string];

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BlogMeta' })
    blogmeta: BlogMeta;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);