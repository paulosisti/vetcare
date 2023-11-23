import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.findByUsernamePassword(email, password);
    } catch (error) {
      throw new UnauthorizedException('Incorrect username or password.');
    }
    const IsPasswordValid = compareSync(password, user.password);
    if (!IsPasswordValid) return null;

    return user;
  }
}
