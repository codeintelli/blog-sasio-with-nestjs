import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './blog.schema';
import { Category } from './category.schema';

export type subCategoryDocument = SubCategory & Document;
@Schema({ timestamps: true })
export class SubCategory {
    @Prop()
    subCategoryName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
    blog: Blog;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categories: Category;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);