import { Body, Controller, Param, Req, Res, Get, Post, HttpStatus, UseGuards, Put, Delete, Patch, } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { CategoryService } from '../category.service';
import { RequestInterface } from '../../auth/interface/user.interface';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly responseService: ResponseHandlerService,

    ) { }

    @Post('/add')
    @UseGuards(IsAuthenticated)
    async doAddCategory(@Req() req: RequestInterface, @Res() res: Response, @Body() request: Request) {
        try {
            let data = await this.categoryService.addCategory(req.user.id, request);
            return this.responseService.sendSuccessResponse(res, data, 'post', "category add succesfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/edit/:id')
    @UseGuards(IsAuthenticated)
    async doUpdateCategory(@Req() req: RequestInterface, @Res() res: Response, @Body() request: Request, @Param('id') param) {
        try {
            let data = await this.categoryService.updateCategory(req.user.id, request, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', 'category edit successfully');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/delete/:id')
    @UseGuards(IsAuthenticated)
    async doDeleteCategory(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.categoryService.deleteCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'patch', "delete category");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('remove/:id')
    @UseGuards(IsAuthenticated)
    async doRemoveCategory(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.categoryService.removeCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'delete');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
    @UseGuards(IsAuthenticated)
    async doGetCategoryList(@Res() res: Response) {
        try {
            let data = await this.categoryService.listCategory();
            return this.responseService.sendSuccessResponse(res, data, 'get', "all category data retrived");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/single/:id')
    @UseGuards(IsAuthenticated)
    async doGetSingleCategory(@Req() req: RequestInterface, @Res() res: Response, @Param('id') param) {
        try {
            let data = await this.categoryService.singleCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'get', "single data retrive successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('toggle-status/:id')
    @UseGuards(IsAuthenticated)
    async doToggleCategoryStatus(@Req() req: Request, @Res() res: Response, @Body() status, @Param('id') param) {
        try {
            // @ts-ignore
            let data = await this.categoryService.toggleCategoryStatus(req.user.id, status, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', "your status change successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}   