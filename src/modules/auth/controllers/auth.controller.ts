import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, HttpCode } from "@nestjs/common";

import { Public } from "@decorators/public.decorator";

import { AuthService } from "../services/auth.service";

import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";

@ApiTags("auth")
@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/register")
    @HttpCode(201)
    async register(@Body() data: RegisterDto) {
        const user = await this.authService.register(data);
        const token = await this.authService.generateAccessToken(user);
        return {
            user,
            token,
        };
    }

    // LOGIN
    @Public()
    @Post("/login")
    @HttpCode(200)
    async login(@Body() data: LoginDto) {
        const user = await this.authService.login(data);
        const token = await this.authService.generateAccessToken(user);
        return {
            user,
            token,
        };
    }
}
