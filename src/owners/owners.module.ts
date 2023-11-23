import { Module } from '@nestjs/common';
import { MailService } from 'src/emails/mail.service';
import { PrismaService } from 'src/prisma.service';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, PrismaService, MailService],
  exports: [OwnersService],
})
export class OwnersModule {}
