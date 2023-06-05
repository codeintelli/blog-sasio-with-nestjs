import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './controller/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/Models/blog.schema';
import { CommonModule } from 'src/common/common.module';
import { ContextService } from 'src/common/services/context.service';
import { BlogCommentSchema } from 'src/Models/blogComment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }, { name: 'BlogComment', schema: BlogCommentSchema }]), CommonModule],
  controllers: [BlogController],
  providers: [BlogService, ContextService],
  exports: [ContextService]
})
export class BlogModule { }
