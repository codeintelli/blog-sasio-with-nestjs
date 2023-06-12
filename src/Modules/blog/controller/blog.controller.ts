import { Body, Controller, Param, Req, Res, Get, Post, Put, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { BlogService } from '../blog.service';
import { RequestInterface } from '../../auth/interface/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';
@Controller('blog')
export class BlogController {

    constructor(
        private readonly blogService: BlogService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    @Post('/add')
    @UseGuards(IsAuthenticated)
    @UseInterceptors(FileInterceptor('blogImg'))
    async doAddBlog(@Req() req: RequestInterface, @Body() payload, @Res() res: Response, @UploadedFile() file) {
        try {
            console.log(req.user.id)
            let folder = "blogfront"
            let data = await this.blogService.addBlog(req.user.id, payload, folder, file);
            return this.responseService.sendSuccessResponse(res, data, 'post', "blog add succesfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Get('profile')
    // @UseGuards(IsAuthenticated)
    // async doGetUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
    //     try {
    //         console.log(req.user.id)
    //         debugger;
    //         let data = await this.blogService.userProfile(req.user.id);
    //         return this.responseService.sendSuccessResponse(res, data, 'get', "profile get succesfully");
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Put('editprofile')
    // @UseGuards(IsAuthenticated)
    // async doUpdateUserProfile(@Req() req: RequestInterface, @Res() res: Response, @Body() editedData) {
    //     try {
    //         let data = await this.blogService.editProfile(req.user.id, editedData);
    //         return this.responseService.sendSuccessResponse(res, data, 'put');
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Put('delete')
    // @UseGuards(IsAuthenticated)
    // async doDeleteUserProfile(@Req() req: RequestInterface, @Res() res: Response) {
    //     try {
    //         let data = await this.blogService.softDeleteUser(req.user.id);
    //         return this.responseService.sendSuccessResponse(res, data, 'put', "delete user");
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Delete('remove/:userId')
    // @UseGuards(IsAuthenticated)
    // async doRemoveUserProfile(@Req() req: RequestInterface, @Res() res: Response, @Param('userId') param) {
    //     try {
    //         let data = await this.blogService.removeUser(req.user.id, param);
    //         return this.responseService.sendSuccessResponse(res, data, 'delete');
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Get('list')
    // @UseGuards(IsAuthenticated)
    // async doGetUserList(@Res() res: Response) {
    //     try {
    //         let data = await this.blogService.listUser();
    //         return this.responseService.sendSuccessResponse(res, data, 'get', "all user data retrived");
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Get('single/:id')
    // @UseGuards(IsAuthenticated)
    // async doGetSingleUser(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
    //     try {
    //         let data = await this.blogService.getUser(req.user.id, param);
    //         return this.responseService.sendSuccessResponse(res, data, 'get', "single data retrive successfully");
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Post('upload-profile')
    // @UseGuards(IsAuthenticated)
    // @UseInterceptors(FileInterceptor('profileImg'))
    // async doUploadProfileUser(@Req() req: Request, @Res() res: Response, @UploadedFile() file) {
    //     try {
    //         let folder = "profile"
    //         // @ts-ignore
    //         let data = await this.blogService.uploadProfileImage(req.user.id, folder, file);
    //         return this.responseService.sendSuccessResponse(res, data, 'post', "user attachment added sucessfully");
    //     } catch (err) {
    //         console.log(err,)
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Put('toggle-status/:id')
    // @UseGuards(IsAuthenticated)
    // async doToggleUserStatus(@Req() req: Request, @Res() res: Response, @Body() status, @Param('id') param) {
    //     try {
    //         // @ts-ignore
    //         let data = await this.blogService.toggleUserStatus(req.user.id, status, param);
    //         return this.responseService.sendSuccessResponse(res, data, 'put', "your status change successfully");
    //     } catch (err) {
    //         return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }


}   