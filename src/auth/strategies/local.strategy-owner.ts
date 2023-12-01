/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalOwnerStrategy extends PassportStrategy(Strategy, 'local-owner') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // Corrija aqui para 'usernameField'
  }

  async validate(email: string, password: string) {
    const owner = await this.authService.validateOwner(email, password);
    if (!owner) {
      throw new UnauthorizedException();
    }

    return owner;
  }
}


