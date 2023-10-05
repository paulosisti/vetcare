import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, PrismaService],
  exports: [OwnersService],
})
export class OwnersModule {}
