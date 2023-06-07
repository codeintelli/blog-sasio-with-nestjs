import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './blog.schema';
import { date } from 'joi';

export type categoryDocument = Category & Document;
@Schema({ timestamps: true })
export class Category {
    @Prop()
    categoryName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
    blog: Blog;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);