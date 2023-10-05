import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PatientsVaccinesController } from './patients-vaccines.controller';
import { PatientsVaccinesService } from './patients-vaccines.service';

@Module({
  controllers: [PatientsVaccinesController],
  providers: [PatientsVaccinesService, PrismaService],
})
export class PatientsVaccinesModule {}
