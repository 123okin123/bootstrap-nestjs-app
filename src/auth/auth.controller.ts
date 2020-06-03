import { Controller, Post, UseGuards, Get, UsePipes, ValidationPipe, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req): string {
    return req.user;
  }

  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
}
