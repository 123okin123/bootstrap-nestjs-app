import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto): Promise<{ access_token: string }> {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  // async getMe(token: string) {
  //   this.jwtService.decode();
  // }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
}
