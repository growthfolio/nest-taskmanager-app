import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLogin } from './../entities/userlogin.entity';

@Controller("/users")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() user: UserLogin): Promise<any> {
        return this.authService.login(user);
    }

}