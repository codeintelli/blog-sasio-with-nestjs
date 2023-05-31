import { Body, Controller, Param, Req, Res, Get, Post, Put, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';
import { registerUserDtos, checkLoginUserData, changePasswordDTO, resetPasswordDTO } from '../../auth/dtos/user.dtos';
import { UserService } from '../services/user.service';
import { RequestInterface } from '../../auth/interface/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    @Get('profile')
    @UseGuards(IsAuthenticated)
    async doGetUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
        try {
            console.log(req.user.id)
            debugger;
            let data = await this.userService.userProfile(req.user.id);
            return this.responseService.sendSuccessResponse(res, data, 'get', "profile get succesfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('editprofile')
    @UseGuards(IsAuthenticated)
    async doUpdateUserProfile(@Req() req: RequestInterface, @Res() res: Response, @Body() editedData) {
        try {
            let data = await this.userService.editProfile(req.user.id, editedData);
            return this.responseService.sendSuccessResponse(res, data, 'put');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('delete')
    @UseGuards(IsAuthenticated)
    async doDeleteUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
        try {
            let data = await this.userService.softDeleteUser(req.user.id);
            return this.responseService.sendSuccessResponse(res, data, 'put', "delete user");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('remove/:userId')
    @UseGuards(IsAuthenticated)
    async doRemoveUserProfile(@Req() req: RequestInterface, @Res() res: Response, @Param('userId') param) {
        try {
            let data = await this.userService.removeUser(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'delete');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('list')
    @UseGuards(IsAuthenticated)
    async doGetUserList(@Res() res: Response) {
        try {
            let data = await this.userService.listUser();
            return this.responseService.sendSuccessResponse(res, data, 'get', "all user data retrived");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('single/:id')
    @UseGuards(IsAuthenticated)
    async doGetSingleUser(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.userService.getUser(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'get', "single data retrive successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('upload-profile')
    @UseGuards(IsAuthenticated)
    @UseInterceptors(FileInterceptor('profileImg'))
    async doUploadProfileUser(@Req() req: Request, @Res() res: Response, @UploadedFile() file) {
        try {
            let folder = "profile"
            // @ts-ignore
            let data = await this.userService.uploadProfileImage(req.user.id, folder, file);
            return this.responseService.sendSuccessResponse(res, data, 'post', "user attachment added sucessfully");
        } catch (err) {
            console.log(err,)
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-profile/:key')
    @UseGuards(IsAuthenticated)
    async getUserProfile(@Param('key') key, @Res() res: Response) {
        try {
            let data = await this.userService.userProfileImage("profile/646ba85efce935ffbf396a0a/shiva.jpg");
            return this.responseService.sendSuccessResponse(res, data, 'get', "user profile")
        }
        catch (err) {
            console.log(err);
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Put('change-password')
    @UseGuards(IsAuthenticated)
    async doChangePassword(@Req() req: Request, @Res() res: Response, @Body() changePass: changePasswordDTO) {
        try {
            // @ts-ignore
            let data = await this.userService.changePassword(req.user.id, changePass);
            return this.responseService.sendSuccessResponse(res, data, 'put', "your password change successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('toggle-status/:id')
    @UseGuards(IsAuthenticated)
    async doToggleUserStatus(@Req() req: Request, @Res() res: Response, @Body() status, @Param('id') param) {
        try {
            // @ts-ignore
            let data = await this.userService.toggleUserStatus(req.user.id, status, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', "your status change successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}   