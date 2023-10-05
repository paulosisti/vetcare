import { Module } from '@nestjs/common';
import { OwnersService } from 'src/owners/owners.service';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { HygienesController } from './hygienes.controller';
import { HygienesService } from './hygienes.service';

@Module({
  controllers: [HygienesController],
  providers: [HygienesService, PrismaService, PatientsService, OwnersService],
})
export class HygienesModule {}
