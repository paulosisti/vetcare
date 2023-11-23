import { Module } from '@nestjs/common';
import { OwnersService } from 'src/owners/owners.service';
import { PrismaService } from 'src/prisma.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService, OwnersService],
  exports: [PatientsService],
})
export class PatientsModule {}
