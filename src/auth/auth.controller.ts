import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(
    @Req() req
  ): Promise<{
    expires_in: string;
    access_token: string;
  }> {
    return await this.authService.createToken(req.user);
  }

  @Post('signup')
  public async signUp(
    @Body(new ValidationPipe()) user: CreateUserDto
  ): Promise<{
    expires_in: string;
    access_token: string;
  }> {
    return await this.authService.signUp(user);
  }

  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
}
