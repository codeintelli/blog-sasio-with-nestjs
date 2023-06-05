import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategorySchema } from 'src/Models/category.schema';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controller/category.controller';
import { ContextService } from 'src/common/services/context.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]), CommonModule],
  controllers: [CategoryController],
  providers: [CategoryService, ContextService],
  exports: [ContextService]
})
export class CategoryModule { }
