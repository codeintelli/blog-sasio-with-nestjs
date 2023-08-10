import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subCategoryDocument } from 'src/Models/subCategory.schema';
import { ContextService } from 'src/common/services/context.service';
import { UserService } from '../user/services/user.service';

@Injectable()
export class SubcategoryService {
    constructor(
        @InjectModel('SubCategory') private readonly subCategoryModel: Model<subCategoryDocument>,
        private readonly message: ContextService,
        private readonly userService: UserService
    ) { }

    public async docheckCategory(catId) {
        let result = await this.subCategoryModel.findById(catId);
        if (!result) {
            throw new NotFoundException(this.message.catgeoryNotFound)
        }
        return result
    }
    public async addSubCategory(userId, reqBody) {
        await this.userService.doCheckUser(userId)
        reqBody.subCategoryName = reqBody.subCatName.toLowerCase();
        let saveSubCategory = new this.subCategoryModel(reqBody)
        let storeResult = await saveSubCategory.save();
        return storeResult;
    }
    public async updateSubCategory(userId, reqBody, param) {
        await this.userService.doCheckUser(userId);
        let editResult = await this.subCategoryModel.findByIdAndUpdate(param, { SubCategoryName: reqBody.subCatName }, { new: true });
        return editResult;
    }
    public async deleteSubCategory(userId, param) {
        await this.userService.doCheckUser(userId);
        await this.subCategoryModel.findByIdAndUpdate(param, { isActive: false }, { new: true });
        return true;
    }

    public async removeSubCategory(userId, param) {
        await this.userService.doCheckUser(userId);
        await this.subCategoryModel.findByIdAndDelete(param);
        return true;
    }

    public async listSubCategory() {
        let getResult = await this.subCategoryModel.find({ isActive: true }).sort('desc');
        return getResult;
    }

    public async singleSubCategory(userId, param) {
        await this.userService.doCheckUser(userId);
        let getUserData = await this.subCategoryModel.findById(param);
        return getUserData;
    }

    public async toggleSubCategoryStatus(userId, status, param) {
        await this.userService.doCheckUser(userId);
        let data = await this.subCategoryModel.findByIdAndUpdate(param, { isActive: status.isActive }, { new: true });
        return data;
    }
}
