import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './controller/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/Models/blog.schema';
import { CommonModule } from 'src/common/common.module';
import { ContextService } from 'src/common/services/context.service';
import { BlogCommentSchema } from 'src/Models/blogComment.schema';
import { UserService } from '../user/services/user.service';
import { UserSchema } from 'src/Models/user.schema';
import { AttachmentSchema } from 'src/Models/attachment.schema';
import { BlogMetaSchema } from 'src/Models/blogMeta.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }, { name: 'BlogMeta', schema: BlogMetaSchema }, { name: 'BlogComment', schema: BlogCommentSchema }, { name: 'User', schema: UserSchema }, { name: 'Attachment', schema: AttachmentSchema }]), CommonModule],
  controllers: [BlogController],
  providers: [BlogService, ContextService, UserService],
  exports: [ContextService, UserService]
})
export class BlogModule { }
