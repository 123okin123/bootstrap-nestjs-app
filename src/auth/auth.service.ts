import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && (await this.passwordsAreEqual(user.password, pass))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(user: LoginUserDto): Promise<{ access_token: string }> {
  //   const payload = { username: user.email };
  //   return {
  //     access_token: this.jwtService.sign(payload)
  //   };
  // }

  public async logIn(email: string, password: string): Promise<UserEntity> {
    return await this.usersService
      .findOne({ email })
      .then(async user => {
        return (await this.passwordsAreEqual(user.password, password))
          ? Promise.resolve(user)
          : Promise.reject(new UnauthorizedException('Invalid password'));
      })
      .catch(err => Promise.reject(err));
  }

  async signUp(user: CreateUserDto): Promise<{ expires_in: string; access_token: string }> {
    return this.usersService.create(user).then(user => {
      // send mail
      return this.createToken(user);
    });
  }

  public async verify(payload) {
    return await this.usersService
      .findOne({ id: payload.sub })
      .then(signedUser => Promise.resolve(signedUser))
      .catch(err => Promise.reject(new UnauthorizedException('Invalid Authorization')));
  }

  async createToken(signedUser: UserEntity): Promise<{ expires_in: string; access_token: string }> {
    const expiresIn = process.env.JWT_EXPIRATION,
      secretOrKey = process.env.SECRET_KEY;
    const user = {
      sub: signedUser.id,
      email: signedUser.email,
      role: signedUser.role,
      status: signedUser.status
    };
    return {
      expires_in: expiresIn,
      access_token: await this.jwtService.sign(user, { expiresIn })
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
}
