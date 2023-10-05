import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ParasiteControllsController } from './parasite-controlls.controller';
import { ParasiteControllsService } from './parasite-controlls.service';

@Module({
  controllers: [ParasiteControllsController],
  providers: [ParasiteControllsService, PrismaService],
})
export class ParasiteControllsModule {}
