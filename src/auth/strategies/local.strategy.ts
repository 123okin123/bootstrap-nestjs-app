import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(email: string, password: string, done: (error: any, user: any) => any): Promise<any> {
    await this.authService
      .logIn(email, password)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }
}
