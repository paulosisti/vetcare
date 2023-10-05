import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';

@Module({
  controllers: [VaccinesController],
  providers: [VaccinesService, PrismaService],
})
export class VaccinesModule {}
