import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { categoryDocument } from 'src/Models/category.schema';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<categoryDocument>,
        private readonly message: ContextService,
        private readonly userService: UserService
    ) { }

    public async docheckCategory(catId) {
        let result = await this.categoryModel.findById(catId);
        if (!result) {
            throw new NotFoundException(this.message.catgeoryNotFound)
        }
        return result
    }
    public async addCategory(userId, reqBody) {
        await this.userService.doCheckUser(userId)
        reqBody.categoryName = reqBody.catName.toLowerCase();
        let saveCategory = new this.categoryModel(reqBody)
        let storeResult = await saveCategory.save();
        return storeResult;
    }
    public async updateCategory(userId, reqBody) {
        await this.userService.doCheckUser(userId);
        let editResult = await this.categoryModel.findByIdAndUpdate(reqBody.catId, { categoryName: reqBody.catName }, { new: true });
        return editResult;
    }
    public async deleteCategory(userId, reqBody) {
        await this.userService.doCheckUser(userId);
        await this.categoryModel.findByIdAndUpdate(reqBody.catId, { isActive: false }, { new: true });
        return true;
    }

    public async removeCategory(userId, param) {
        await this.userService.doCheckUser(userId);
        await this.categoryModel.findByIdAndDelete(param);
        return true;
    }

    public async listCategory() {
        let getResult = await this.categoryModel.find({ isActive: true }).sort('desc');
        return getResult;
    }

    public async singleCategory(userId, param) {
        await this.userService.doCheckUser(userId);
        let getUserData = await this.categoryModel.findById(param);
        return getUserData;
    }

    public async toggleCategoryStatus(userId, status, param) {
        await this.userService.doCheckUser(userId);
        let data = await this.categoryModel.findByIdAndUpdate(param, { isActive: status.isActive }, { new: true });
        return data;
    }

}
