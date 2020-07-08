import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  public async logIn(email: string, password: string): Promise<UserEntity> {
    console.log(email, password);
    return await this.usersService
      .findOne({ email })
      .then(async user => {
        if (!user) {
          return Promise.reject(new UnauthorizedException('Invalid email'));
        }
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

  public async verify(payload: { sub: string }): Promise<UserEntity> {
    return await this.usersService
      .findOne({ id: payload.sub })
      .then(signedUser => Promise.resolve(signedUser))
      .catch(() => Promise.reject(new UnauthorizedException('Invalid Authorization')));
  }

  async createToken(signedUser: UserEntity): Promise<{ expires_in: string; access_token: string }> {
    const expiresIn = process.env.JWT_EXPIRATION;
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
