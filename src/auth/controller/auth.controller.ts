import {
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Owner, User } from '@prisma/client';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    // Certifique-se de que req.user seja do tipo User
    const user: User = req.user;
    if (!user || !user.id || !user.email) {
      throw new UnauthorizedException(
        'User object is missing required properties.',
      );
    }

    return await this.authService.login(user);
  }

  @UseGuards(AuthGuard('local-owner'))
  @Post('login/owner')
  async loginOwner(@Req() req: any) {
    // Certifique-se de que req.user seja do tipo Owner
    const owner: Owner = req.user;
    console.log(owner);
    if (!owner || !owner.id || !owner.email) {
      throw new UnauthorizedException(
        'Owner object is missing required properties.',
      );
    }

    return await this.authService.loginOwner(owner);
  }
}
