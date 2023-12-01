import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OwnersModule } from 'src/owners/owners.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalOwnerStrategy } from './strategies/local.strategy-owner';

@Module({
  imports: [
    UsersModule,
    OwnersModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, LocalOwnerStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
