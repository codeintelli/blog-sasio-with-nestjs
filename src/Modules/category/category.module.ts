import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategorySchema } from 'src/Models/category.schema';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controller/category.controller';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';
import { UserSchema } from 'src/Models/user.schema';
import { AttachmentSchema } from 'src/Models/attachment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }, { name: 'User', schema: UserSchema }, { name: 'Attachment', schema: AttachmentSchema }]), CommonModule],
  controllers: [CategoryController],
  providers: [CategoryService, ContextService, UserService],
  exports: [ContextService, UserService]
})
export class CategoryModule { }
