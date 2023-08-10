import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { SubcategoryService } from '../subcategory.service';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';

@Controller('subcategory')


export class SubcategoryController {
    constructor(
        private readonly subCategoryService: SubcategoryService,
        private readonly responseService: ResponseHandlerService,

    ) { }

    @Post('/add')
    @UseGuards(IsAuthenticated)
    async doAddCategory(@Req() req, @Res() res, @Body() request) {
        try {
            let data = await this.subCategoryService.addSubCategory(req.user.id, request);
            return this.responseService.sendSuccessResponse(res, data, 'post', "category add succesfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/edit/:id')
    @UseGuards(IsAuthenticated)
    async doUpdateCategory(@Req() req, @Res() res, @Body() request, @Param('id') param) {
        try {
            let data = await this.subCategoryService.updateSubCategory(req.user.id, request, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', 'category edit successfully');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/delete/:id')
    @UseGuards(IsAuthenticated)
    async doDeleteCategory(@Req() req, @Res() res, @Param('id') param) {
        try {
            let data = await this.subCategoryService.deleteSubCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'patch', "delete category");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('remove/:id')
    @UseGuards(IsAuthenticated)
    async doRemoveCategory(@Req() req, @Res() res, @Param('id') param) {
        try {
            let data = await this.subCategoryService.removeSubCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'delete');
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
    @UseGuards(IsAuthenticated)
    async doGetCategoryList(@Res() res) {
        try {
            let data = await this.subCategoryService.listSubCategory();
            return this.responseService.sendSuccessResponse(res, data, 'get', "all category data retrived");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/single/:id')
    @UseGuards(IsAuthenticated)
    async doGetSingleCategory(@Req() req, @Res() res, @Param('id') param) {
        try {
            let data = await this.subCategoryService.singleSubCategory(req.user.id, param);
            return this.responseService.sendSuccessResponse(res, data, 'get', "single data retrive successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('toggle-status/:id')
    @UseGuards(IsAuthenticated)
    async doToggleCategoryStatus(@Req() req, @Res() res, @Body() status, @Param('id') param) {
        try {
            // @ts-ignore
            let data = await this.subCategoryService.toggleSubCategoryStatus(req.user.id, status, param);
            return this.responseService.sendSuccessResponse(res, data, 'put', "your status change successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
