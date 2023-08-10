import { Body, Controller, Param, Req, Res, Get, Post, Put, Delete, HttpStatus, HttpException, UseGuards, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
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
    async doAddBlog(@Req() req, @Body() payload, @Res() res, @UploadedFile() file) {
        try {
            console.log(req.user.id)
            let folder = "blogfront"
            let data = await this.blogService.addBlog(req.user.id, payload, folder, file);
            return this.responseService.sendSuccessResponse(res, data, 'post', "blog add succesfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('/edit/:id')
    @UseGuards(IsAuthenticated)
    async doUpdateBlog(@Req() req, @Res() res, @Body() request, @Param('id') param) {
        try {
            let data = await this.blogService.updateBlog(req.user.id, request, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', 'blog edit successfully');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('delete/:id')
    @UseGuards(IsAuthenticated)
    async doDeletBlog(@Req() req, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.blogService.deleteBlog(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'patch', "delete blog");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('remove/:id')
    @UseGuards(IsAuthenticated)
    async doRemoveUserProfile(@Req() req, @Res() res, @Param('id') param) {
        try {
            let data = await this.blogService.removeBlog(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'delete');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('list')
    @UseGuards(IsAuthenticated)
    async doGetBlogList(@Res() res: Response) {
        try {
            let data = await this.blogService.listBlog();
            return this.responseService.sendSuccessResponse(res, data, 'get', "all blogs are retrived");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('single/:id')
    @UseGuards(IsAuthenticated)
    async doGetSingleUser(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.blogService.singleBlog(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'get', "single blog retrive successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('toggle-status/:id')
    @UseGuards(IsAuthenticated)
    async doToggleUserStatus(@Req() req: Request, @Res() res: Response, @Body() status, @Param('id') param) {
        try {
            // @ts-ignore
            let data = await this.blogService.toggleBlogStatus(req.user.id, status, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', "blog status updated successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('comment/add')
    @UseGuards(IsAuthenticated)
    async doAddBlogComment(@Req() req: Request, @Res() res: Response, @Body() comment) {
        try {
            // @ts-ignore
            let data = await this.blogService.addBlogComment(req.user.id, comment);
            return this.responseService.sendSuccessResponse(res, data, 'post', "blog comment add successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('comment/get/:id')
    @UseGuards(IsAuthenticated)
    async doGetBlogComment(@Req() req: Request, @Res() res: Response, @Param('id') param) {
        try {
            // @ts-ignore
            let data = await this.blogService.getBlogComment(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'get', "blog comment get successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}   