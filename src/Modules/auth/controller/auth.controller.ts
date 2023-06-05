
import { Body, Controller, Param, Req, Res, Get, Post, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHandlerService } from 'src/common/services/responseHandler.service';
import { IsAuthenticated } from 'src/Modules/auth/jwt-guard';
import { registerUserDtos, checkLoginUserData, resetPasswordDTO } from '../dtos/user.dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly responseService: ResponseHandlerService,
    ) { }

    @Post('register')
    async doRegisterUser(@Res() res: Response, @Body() registerData: registerUserDtos) {
        try {

            let result = await this.authService.registerUser(registerData);
            return this.responseService.sendSuccessResponse(res, result, 'register');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    async doLoginUser(@Res() res: Response, @Body() loginData: checkLoginUserData) {
        try {
            let result = await this.authService.loginUser(loginData.email, loginData.password);
            console.log("🚀 ~ file: user.controller.ts ~ line 31 ~ UserController ~ loginUser ~ data", result);
            return this.responseService.sendSuccessResponse(res, result, 'login');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('forgot-password/:email')
    async doForgotPassword(@Res() res: Response, @Param('email') email) {
        try {
            // @ts-ignore
            let data = await this.authService.forgotPassword(email);
            return this.responseService.sendSuccessResponse(res, data, 'get', "forgot password link send in your email please check and verofy it");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('reset-password')
    async doResetPassword(@Res() res: Response, @Body() req: resetPasswordDTO) {
        try {
            let data = await this.authService.resetPassword(req)
            return this.responseService.sendSuccessResponse(res, data, 'post', "your password is reset successfully");
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('logout')
    @UseGuards(IsAuthenticated)
    async doLogout(@Req() req: Request, @Res() res: Response) {
        try {
            // @ts-ignore
            let data = await this.authService.logoutUser(req.user.id)
            return this.responseService.sendSuccessResponse(res, data, 'post', 'logout')
        } catch (err) {
            return this.responseService.sendErrorResponse(res, err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}   