import { Module } from '@nestjs/common';
import { SubcategoryController } from './controller/subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from 'src/Models/subCategory.schema';
import { CommonModule } from 'src/common/common.module';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';
import { UserSchema } from 'src/Models/user.schema';
import { AttachmentSchema } from 'src/Models/attachment.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema }, { name: 'User', schema: UserSchema }, { name: 'Attachment', schema: AttachmentSchema }]), CommonModule],
    controllers: [SubcategoryController],
    providers: [SubcategoryService, ContextService, UserService],
    exports: [ContextService, UserService]
})
export class SubcategoryModule { }
