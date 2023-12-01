import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Owner, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { OwnersService } from 'src/owners/owners.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private ownersService: OwnersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    if (!user || !user.id || !user.email) {
      throw new UnauthorizedException(
        'User object is missing required properties.',
      );
    }

    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async loginOwner(owner: Owner) {
    if (!owner || !owner.id || !owner.email) {
      throw new UnauthorizedException(
        'Owner object is missing required properties.',
      );
    }

    const payload = { sub: owner.id, email: owner.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByUsernamePassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    return user;
  }

  async validateOwner(email: string, password: string) {
    const owner = await this.ownersService.findByOwnerNamePassword(
      email,
      password,
    );
    if (!owner) {
      throw new UnauthorizedException('Incorrect owner name or password.');
    }

    const isPasswordValid = compareSync(password, owner.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect owner name or password.');
    }

    return owner;
  }
}
