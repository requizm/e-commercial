import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/db/entity/User';
import { AuthService } from 'src/service/AuthService';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Req() request: Request, @Res() res: Response) {
    const user = JSON.parse(JSON.stringify(request.body)) as User;
    const status = await this.authService.register(user);
    if (status) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('User already exists');
    }
  }

  @Post('login')
  async login(@Req() request: Request, @Res() res: Response) {
    const user = JSON.parse(JSON.stringify(request.body)) as User;
    const status = await this.authService.login(user);
    if (status) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('Wrong username or password');
    }
  }
}
