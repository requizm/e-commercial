import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/db/entity/User";
import { AuthService } from "src/service/AuthService";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    async register(@Req() request: Request, @Res() res: Response) {
        const user = JSON.parse(JSON.stringify(request.body)) as User;
        const result = await this.authService.register(user);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }

    @Post("login")
    async login(@Req() request: Request, @Res() res: Response) {
        const user = JSON.parse(JSON.stringify(request.body)) as User;
        const result = await this.authService.login(user);
        res.status(
            result.message ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK
        ).json(result);
    }
}
