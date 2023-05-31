import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { JwtAuthService } from '../../../common/services/jwt.service';
import { ContextService } from '../../../common/services/context.service';
import { AwsService } from '../../../common/services/aws.service';
import { Attachment } from 'src/Models/attachment.schema';
import { userDocument } from 'src/Models/user.schema';
import { MailService } from 'src/common/services/mail.service';
import { PasswordService } from '../../../common/services/password.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<userDocument>,
        @InjectModel('Attachment') private readonly attachmentModel: Model<Attachment>,
        private readonly responseService: ResponseHandlerService,
        private readonly jwtService: JwtAuthService,
        private readonly message: ContextService,
        private readonly awsService: AwsService,
        private readonly mailService: MailService,
        private readonly passwordService: PasswordService
    ) {

    }

    public async doCheckUser(userId) {
        let verifiedUser = await this.userModel.findOne({ _id: userId, isActive: true });
        if (!verifiedUser) {
            throw new NotFoundException(this.message.userNotFound);
        }
        return verifiedUser;
    }

    public async doCheckAttachmentUser(userId) {
        let userProfile = await this.attachmentModel.findOne({ user: userId });
        if (!userProfile) {
            throw new NotFoundException(this.message.userNotFound);
        }
        return userProfile;
    }

    public async userProfile(userId) {
        let result = await this.doCheckUser(userId);
        return result;
    }

    public async editProfile(userId, data) {
        await this.doCheckUser(userId);
        let doUpdateUserData = await this.userModel.findByIdAndUpdate(userId, data, { new: true });
        return doUpdateUserData;
    }

    public async softDeleteUser(userId) {
        await this.doCheckUser(userId);
        await this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        return true;
    }

    public async removeUser(userId, param) {
        await this.doCheckUser(userId);
        await this.userModel.findByIdAndDelete(param);
        return true;
    }

    public async listUser() {
        let getListUser = await this.userModel.find({ isActive: true }).sort('desc');
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getListUser", getListUser);
        return getListUser;
    }

    public async getUser(userId, param) {
        await this.doCheckUser(userId);
        let getUserData = await this.userModel.findById(param);
        console.log("🚀 ~ file: user.service.ts ~ line 86 ~ UserService ~ listUser ~ getUserData", getUserData);
        return getUserData;
    }

    public async uploadProfileImage(userId, folderName, fileObj) {

        let user = await this.doCheckUser(userId);
        let checkUser = await this.doCheckAttachmentUser(user.id)
        let result = await this.awsService.uploadFile(folderName, userId, fileObj);
        if (!checkUser) {
            checkUser = new this.attachmentModel()
        }
        checkUser.filename = fileObj.originalname;
        checkUser.fileType = fileObj.mimetype;
        checkUser.size = fileObj.size;
        checkUser.location = result.Bucket;
        checkUser.key = result.Key;
        checkUser.url = result.Location;
        user = userId;
        let storedData = await checkUser.save()
        return storedData;
    }

    public async userProfileImage(key) {
        let result = await this.awsService.getSignedUrl(key);
        return result;
    }

    public async changePassword(userId, data) {
        const user = await this.doCheckUser(userId);
        let isPasswordMatched = await this.passwordService.verifyPassword(data.password, user.password);
        if (!isPasswordMatched) {
            throw new BadRequestException(this.message.invalidCred);
        }
        let securedPassword = await this.passwordService.securedPassword(data.newPassword)
        await this.userModel.findByIdAndUpdate(userId, { password: securedPassword }, { new: true });
        return true;
    }

    public async toggleUserStatus(userId, status, param) {
        await this.doCheckUser(userId);
        let data = await this.userModel.findByIdAndUpdate(param, { isActive: status.isActive }, { new: true });
        return data;
    }

}
